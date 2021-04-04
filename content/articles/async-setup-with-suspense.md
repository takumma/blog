---
title: "Suspenseを使ってasync setup()ができるようにする"
slug: "async-setup-with-suspense"
tags: ["vue"]
date: "2021/04/03"
---

Composition API では、Options API の created(と beforeCreated) は setup() 内に記述します。その関係で、非同期関数を setup()内に記述したいときがあります。
そういうときは、Vue3 の新機能である**Suspense**を用いると便利です。

# Suspense とは？

子コンポーネントの状態によってフォールバックコンテンツをレンダリングする特別なコンポーネントです。
例えば API 通信をしている間に出したい Progress Bar とかぐるぐるとかの表示を Suspense を使うと簡潔に書くことができるということです。

# `v-if`・`Suspense` それぞれの書き方

### `v-if` の場合
いままでこういった処理は `v-if` を使って実装されることが多かったと思います。以下に `v-if` を用いた例を示します。

```html [Sample.vue]
<template>
  <div>
    <div v-if="isLoading">
      読み込み中...
    </div>
    <div v-else>
      コンテンツ
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      isLoading: true,
    }
  },
  async created() {
    await asyncFunc()
    this.isLoading = false
  }
}
</script>
```

### Suspense の場合
Suspense では、以下のようにすることで非同期処理が完了するまで「読み込み中...」を表示してくれます。

```html [Parent.vue]
<template>
  <Suspense>
    <template #default>
      <child/>
    </template>
    <template #fallback>
      読み込み中...
    </template>
    <template #error>
      エラー
    </template>
  </Suspense>
</template>
```

```html [Child.vue]
<template>
  <div>...</div>
</template>

<script>
export default {
  async setup() {
    await asyncFunc()
    return {
      // ...
    }
  }
}
</script>
```

Suspense 内の `#default` などの中にはそれぞれ以下を記述します。

- `#default`：表示したい非同期な子コンポーネント
- `#fallback`：`#default` 内に記述した非同期コンポーネントの処理が終わるまで表示するもの
- `#error`：`#default` 内の非同期コンポーネントの処理が異常終了したときに表示するもの

親コンポーネントで Suspense を用いると、その子コンポーネントで `async setup()` を利用できます。


# App.vue に記述する

App.vue で `router-view` を Suspense で囲めば、各ページコンポーネントで非同期の setup 関数を記述できます。

```html [App.vue]
<template>
  <Suspense>
    <template #default>
      <router-view />
    </template>
    <template #fallback>
      読み込み中...
    </template>
    <template #error>
      エラー
    </template>
  </Suspense>
</template>
```

# まとめ

- Suspense はフォールバックコンテンツだけでなくエラーコンテンツをレンダリングできる。
- `setup()` を非同期にしたいときは、Suspense を使うと楽。

以上です。
