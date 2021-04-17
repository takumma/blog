---
title: "Nuxt Contentのブログに埋め込みリンクを追加する"
slug: "add-embed-link"
tags: ["vue", "nuxt"]
date: "2021/04/16"
---

Nuxt Content で作ってるこの個人ブログに、埋め込みリンクを実装しました。

（こんな感じ↓）

<embed-link src="https://blog.takumma.net/"></embed-link>

普通の埋め込みリンクに加えて Twitter のツイートや Youtube も埋め込めるようにしたので、やり方を書いておきます。

Nuxt Content は Vue のコンポーネントをそのまま Markdown ファイル内に記述して記事に Vue コンポーネントを追加できます。なので各埋め込みリンクのコンポーネントを作成して、それを記事で記述する。という形になります。

# Twitter 埋め込み

まずは Twitter のツイートを埋め込んでいきます。ツイートを埋め込むのは `vue-tweet-embed` というライブラリを使用するので、とりあえずライブラリをインストールしましょう。

```
$ npm i --save vue-tweet-embed
```

埋め込みツイートのコンポーネントを作成します。

```html [components/TweetCard.vue]
<template>
  <Tweet :id="id" class="tweet"/>
</template>

<script lang="ts">
import { Vue, Component, Prop } from "nuxt-property-decorator";
import { Tweet } from 'vue-tweet-embed'

@Component({
  components: {
    Tweet,
  }
})
export default class TweetCard extends Vue {
  @Prop({ type: String, required: true })
  id!: string;
}
</script>

<style scoped>
.tweet {
  margin: 2rem 0px;
}
</style>
```

記事ページのコンポーネントでインポートします。

```js [pages/_slug.vue]
const TweetCard = () => import('~/components/TweetCard.vue')

export default {
  // ...
  components: {
    TweetCard,
  },
}
```

実際に記事で使ってみましょう。`id` にはツイートの URL の `https://twitter.com/ukai_0417/status/${id}` ←この部分を入れます。

```md [sample.md]
<tweet-card id="1360343880760131584"></tweet-card>
```

するとツイートが埋め込まれます。

<tweet-card id="1360343880760131584"></tweet-card>

(カンタン)

# Youtube 埋め込み

続いて Youtube を埋め込んでいきます。Youtube の埋め込みも、`vue-youtube` という便利なパッケージがあるのでそれを使います。

```
$ npm i --save vue-youtube
```

`vue-youtube` が使えるように設定していきます。

```js [plugins/vue-youtube.js]
import Vue from 'vue'
import VueYoutube from 'vue-youtube'

Vue.use(VueYoutube)
```

```js [nuxt.config.js]
export default {
  //...
  plugins: [
    '~/plugins/vue-youtube'
  ],
}
```

Youtube 埋め込み用のコンポーネントを作成します。

```html [components/YoutubeCard.vue]
<template>
  <youtube :video-id="id" class="youtube"></youtube>
</template>

<script lang="ts">
import { Vue, Component, Prop } from "nuxt-property-decorator";

@Component
export default class TweetCard extends Vue {
  @Prop({ type: String, required: true })
  id!: string;
}
</script>

<style>
.youtube {
  width: 100%;
  max-width: 640px;
  padding: 2rem 0px;
}
</style>
```

埋め込みはそのまま `<youtube>` タグで埋め込めます。埋め込みが記事からはみ出すのを防ぐためにスタイルをあててます。

記事ページのコンポーネントでインポートします。

```js [pages/_slug.vue]
const YoutubeCard = () => import('~/components/YoutubeCard.vue')

export default {
  // ...
  components: {
    //...
    YoutubeCard
  },
}
```

記事で使ってみます。`id` には `https://www.youtube.com/watch?v=${id}` ←の部分を入れます。

```md [sample.md]
<youtube-card id="4AoFA19gbLo"></youtube-card>
```
<youtube-card id="4AoFA19gbLo"></youtube-card>

埋め込みができました～。


# 埋め込みリンク

最後は普通の埋め込みリンクを作ります。

まず、埋め込みリンクに必要なものは何でしょうか？

埋め込みリンクを表示させるには、URL からページタイトルや OGP 画像などのメタデータを取得しなければなりません。しかし、普通にフロント側から取得するためにリクエストを送ろうとしても、**CORS**(Cross-Origin Resource Sharing: )エラーが起きてしまいます。

なので URL 先のメタデータを取得する API を用意する必要があります。しかしわざわざこのためにバックエンドを実装するのは面倒ですね...（サーバーも用意しないといけんし。）ということで、FaaS を使ってサーバーレスで実装していきましょう。
FaaS はいろいろとありますが、今回はこのサイト自体が Netlify でホスティングされているということもあって「Netlify Functions」を使うことにしました。この記事では Netlify Functions をベースに説明していきますが、実際のコードの部分などは大体ほかの FaaS などでも使えると思います。（多分。）

## Netlify Functions のセットアップ

Netlify にデプロイしていることを前提で進めます。

まずは必要なパッケージを一通りインストールします。JS で開発しているなら `@types/aws-lambda` は必要ないです。

```
$ npm i --save-dev netlify-lambda @types/aws-lambda
```

netlify の設定をします。ルートに `netlify.toml` を作成して、設定を記述します。

```js [netlify.toml]
[build]
  Command = "npm run generate"
  functions = "functions/dist"
  publish = "dist/"
```

functions を起動するスクリプトを追加しておきます。

```json [package.json]
{
  "scripts": {
    "dev:functions": "netlify-lambda serve functions/api",
  },
}
```

`npm run dev:functions` というコマンドを実行して、起動することが出来ます。

## メタデータを取得する関数を実装

設定ができたので、メタデータを取得する関数を実装していきましょう。

メタデータの取得には、`ogp-parser` というパッケージを利用します。普通に fetch してから DOM にパースして meta タグを抜き出して...みたいな方法もありますが、今回の要件ではパッケージを用いるのが手っ取り早いし楽なので後者でいきます。

パッケージをインストールしましょう。

```
npm i --save ogp-parser
```

`functions/api` というディレクトリを作って、そこに関数のファイルを置きます。（突貫で作ったのでコードはかなり汚いです...）

```ts [embed-link.ts]
import { Context, Callback, APIGatewayEvent } from 'aws-lambda'

exports.handler = async (
  event: APIGatewayEvent,
  context: Context,
  callback: Callback,
) => {
  const params = event.queryStringParameters
  const url = params?.url;
  if(!url){
    callback("400", {});
    return
  }
  const parser = require("ogp-parser")
  const response = await parser(url, { skipOembed: true })
    .then((data: any) => {
      const siteName = data.ogp["og:site_name"] || [""]
      const title = data.title
      const description = data.seo.description || data.ogp["oG:description"] || [""]
      const image = data.ogp["og:image"] || [""]
      const twitterCard = data.seo["twitter:card"] || data.ogp["twitter:card"] || [""]
      return {
        statusCode: 200,
        "headers": { "Content-Type": "application/json; charset=utf-8"},
        body: JSON.stringify({
          url: url,
          siteName: siteName[0],
          title: title,
          description: description[0],
          image: image[0],
          twitterCard: twitterCard[0],
        })
      }
  })
  callback(null, response)
}
```

実行して `http://localhost:9000/.netlify/functions/embed-link?url=https://blog.takumma.net` にアクセスすると、このサイトの情報が取得できるかと思います。

## フロント側で関数を呼び出す

しかしこのまま実行しても、開発環境ではフロントは 3000 ポート、functions は 9000 ポートで実行され、フロントで呼び出しても CORS エラーが出てしまいます。これを解決するために、`@nuxtjs/proxy` というパッケージを使っていきます。

まずはインストール。

```
npm i --save @nuxtjs/proxy
```

`nuxt.config.js` で設定をします。

```js [nuxt.config.js]
export default {
  // ...
  modules: [
    '@nuxtjs/proxy'
  ],
  proxy: {
    '/.netlify/functions': {
      target: 'http://localhost:9000'
    }
  }
}
```

これで OK です。

では実際に呼び出してみましょう。埋め込みリンク用のコンポーネントを作成して、そのコンポーネントの `mounted` で呼び出しています。

```html [EmbedLink.vue]
<template>
  <div class="embed-link" :href="src">
    <div class="link">
      <h1 class="title">{{ data.title }}</h1>
      <div class="others">
        <p>{{ data.description }}</p>
        <p>{{ hostName(src) }}</p>
      </div>
    </div>
    <div v-if="data.image" class="img-wrapper">
      <img :src="data.image" :alt="data.title" class="ogp-img">
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from "nuxt-property-decorator";

interface Link {
  title: string;
  description: string;
  url: string;
  image: string;
  siteName: string;
  twitterCard: string;
}

@Component
export default class EmbedLink extends Vue {
  @Prop({ type: String, required: true })
  src!: string;

  data: Link = {
    title: "",
    description: "",
    url: "",
    image: "",
    siteName: "",
    twitterCard: "",
  }

  async mounted() {
    try {
      const resp = await this.$axios.$get(`.netlify/functions/embed-link?url=${this.src}`)
      this.data = resp
    } catch (err) {
      console.error(err)
    }
  }

  hostName = (url: string) => url.split('/')[2]
}
</script>

<style scoped>
/* 略 */
</style>
```

記事ページのコンポーネントでインポートします。

```js [pages/_slug.vue]
const EmbedLink = () => import('~/components/EmbedLink.vue')

export default {
  // ...
  components: {
    //...
    EmbedLink
  },
}
```

記事で使ってみます。

```html
<embed-link src="https://blog.takumma.net/"></embed-link>
```

<embed-link src="https://blog.takumma.net/"></embed-link>

無事に取得したメタデータを使って埋め込みリンクが作成できました。ﾔｯﾀﾈ！

# まとめ

Twitter, Youtube, そして埋め込みリンクの実装を紹介しました。コアな部分はパッケージでごり押しできるので、非常に楽に実装が出来ます。（僕がやった時は埋め込みリンクのところで初めは DOM にパースして meta タグを抜き出す方法でやろうとしてかなり詰まりましたが...。）

このブログのソースは公開してるので参考になれば幸いです...！

<embed-link src="https://github.com/takumma/blog"></embed-link>