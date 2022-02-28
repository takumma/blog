---
title: 'Reactハンズオンラーニング感想・読書メモ'
slug: 'read-learning-react'
tags: ['book', 'react']
date: '2022/02/28'
---

# React ハンズオンラーニング

日本語リポジトリ

[https://github.com/oreilly-japan/learning-react-2e-ja](https://github.com/oreilly-japan/learning-react-2e-ja)

React ハンズオンラーニングという本を読んだので、読みながら書いたメモと感想を残します。

読んだ感想としては、凄くいい本だと思いました。

- 感想
- 読書メモ

# 感想まとめ

そもそも自分は React 全体を触るのと hooks の理解を深める目的で読んでます。それを前提とした感想です。

- 前半（5 章くらいまで）は、おさらい的な内容。巻き上げや this とかの話もあって普通に読み物です。あと、カリー化とか関数型プログラミングの話題もあって、JavaScript の全体感をさらっと（文法などにフォーカスしすぎず、くどすぎない内容で）読めてよかった。
- 飛ばしたけど webpack を触るところがあって、そこら辺を軽く知ることもできそうな感じがした。
- 6 章あたりからハンズオンっぽくなっててだんだん楽しくなってくる。
- ほどほどに props バケツリレーを感じれる(めんどくさいですよね？ → 状態管理の流れ)ので、いい構成だなと感じた
- ハンズオンするところとしないところ（ただのサンプルコード）の区別がつきにくい印象があった。
- コードは JS だけど、型がないと読めないほど複雑なコードも無いので普通に読めるしハンズオンでは自分で TS に書き直せば大丈夫。
  - 多分 React できるならここら辺楽勝なんだろうけど、俺には少し難しかった。（Element 周りとか）俺はさらっと any でごまかしてたけど、厳密に書いたらそこそこ大変かも？
  - **逆に JS であることで、書いてあるのを模写するだけじゃなくちゃんと型とか JS でごまかされている部分を補ったりして自己学習をしながら進められる**ので、むしろ良いかもしれない。
- **カスタムフックなどを用いてうまく抽象化して関心を分離していく**のが面白かった。これはこの本読んで**特に良かったポイント**の一つ。自分の目的は割とここら辺で達成された気がする。
- なんか本とかサンプルリポジトリでコードがないコンポーネントとかがあるけど、これは勝手に実装しろという認識でおけ？
  - ポジティブにとらえると practice みたいな感じでいいんだけど、サンプルリポジトリに例くらい載せてもいいんじゃないかなと思いました。
  - 実装したけど、前の章とかのやつを参考に実装できて楽しい。作者執筆がうまい（？）。
- なんかパッケージとか少し古い気がするので注意が必要。
- 型に関する、Flow や PropTypes のような TypeScript 以外のソリューションも解説されていて面白い。

全体としてまとめると、ハンズオンと本全体の構成が良くて面白かったです。序盤はポイントを押さえつつ、フロントエンドのいろいろな関心事に一通り触れられて、その先は興味のあるところから自己学習が始められる。というようなふうに作られていていい本だと感じました。ところどころ思うところはありつつも、最新のフロントエンドを体系的に学習できる（物理の）本は希少で需要もあるのでそのような意味でも価値のある本だと思います。

# 読書メモ

かなりかいつまんでるし、後半適当です。完全に自分用。

## 関数の巻き上げ

```jsx
func()

// 宣言前に呼び出し（巻き上げ）ができる

function func() {
  console.log('hello')
}
```

```jsx
func()

// × 変数（定数）なので、代入前に呼び出し（巻き上げ）ができない

const func = function () {
  console.log('hello')
}
```

## this

```jsx
// 通常の関数（thisはWindowオブジェクト）

var tahoe = {
  mountains: ['Freel', 'Rose', 'Tallac', 'Rubicon', 'Silver'],
  print: function (delay = 1000) {
    setTimeout(function () {
      console.log(this.mountains.join(',')) // thisはWindowオブジェクト
    }, delay)
  },
}

tahoe.print() // エラー
```

```jsx
var tahoe = {
  mountains: ['Freel', 'Rose', 'Tallac', 'Rubicon', 'Silver'],
  print: function (delay = 1000) {
    setTimeout(
      function () {
        console.log(this.mountains.join(','))
      }.bind(this),
      delay
    ) // OK. tahoeのオブジェクトをthisとして渡している
  },
}

tahoe.print()
```

```jsx
// アロー関数（thisはtahoeオブジェクト）

var tahoe = {
  mountains: ['Freel', 'Rose', 'Tallac', 'Rubicon', 'Silver'],
  print: function (delay = 1000) {
    setTimeout(
      () => console.log(this.mountains.join(',')), // this は tahoe
      delay
    )
  },
}

tahoe.print()
```

```jsx
// アロー関数（thisはWindowオブジェクト）

var tahoe = {
  mountains: ['Freel', 'Rose', 'Tallac', 'Rubicon', 'Silver'],
  print: (delay = 1000) => {
    setTimeout(() => {
      console.log(this.mountains.join(','))
    }, delay)
  },
}

tahoe.print() // エラー
```

```jsx
// アロー関数（thisはtahoeオブジェクト）

var tahoe = {
  mountains: ['Freel', 'Rose', 'Tallac', 'Rubicon', 'Silver'],
  print: function (delay = 1000) {
    setTimeout(() => {
      console.log(this === window)
    }, delay)
  },
}

tahoe.print() // false
```

# 関数型プログラミング

## イミュータブルなデータ

関数などでデータを変更（mutate）しない。変更したものを返したいときは、そのものではなくコピーを作成して、それを変更して返す。

## 純粋関数

- 関数は少なくとも一つの引数を受取らなければならない
- 関数は値もしくは他の関数を戻り値として返却しなければならない
- 関数は引数や関数外で定義された変数に直接変更を加えてはいけない

## データの変換

データはイミュータブルなので、変更せず、次々に宣言していって状態を遷移させる。

**Array.map や Array.reduce。大事。**

Array.pop や Array.slice は破壊的 → Array.filter は非破壊的

## カリー化

その場で処理を実行せずに、関数として返却することで、処理の実行タイミングを呼び出し元にゆだねることができる。

```jsx
const userLogs = username => message => console.log(`${username}` -> ${message});

const log = userLogs('Bob');

log('hello!');

getFakeMemberss(20).then(
	menbers => log(`there are ${menbers.length} menbers`)
).catch(
	error => log(`I can't see menbers becouse of This Error: ${error}`)
);
```

- コメントを書く時点でそのコードはわかりにくい

## 状態管理

- DOM を介してデータにアクセスするコンポーネント：**制御されていないコンポーネント（uncontrolled component）**
- フォームの入力などで再描画は何度走ってもたいてい大丈夫（React が不必要な再描画などを調停してくれる）
- **ただ、onChange などの関数は毎回呼ばれるため、重い処理をそこに書いていると重くなる（パフォーマンス）**

## フック

### useEffect

```jsx
const Component = () => {

	useEffect(() => {
		welcomeChime.play(); // 初回描画時
		return () => goodbyeChime.play(); // 削除時
}, [])
	return (...)
}
```

### メモ化

- メモ化を行うと、依存配列に入っているものが同じであれば、同じインスタンスが返却させる。
- パフォーマンスの改善が望める。
- また、返されるインスタンスが同じなので、関数や配列など定義をするごとにインスタンスが変わるものであっても、依存配列に指定することができたり、それらの値を比較することができる。

```jsx
const next = useCallback(() => {
  if (i === items.length - 1) return setIndex(0)
  setIndex(i + 1)
}, [i])

const item = useMemo(() => items[i], [i])
```

## データ

### 仮想リスト (ウィンドウリスト)

> 巨大な配列を描画するリストなどで、その大きなデータの内、一部のみを描画してスクロールのたびに現在表示されているリストをアンマウントして新たなデータを描画するテクニック

![Untitled](React%20%E3%83%8F%E3%83%B3%E3%82%B9%E3%82%99%20a262f/Untitled.png)

React だと、`react-window`や、`react-virtualized`で実装されている。

```jsx
import faker from '@faker-js/faker'
import React from 'react'
import './App.css'
import { FixedSizeList } from 'react-window'

type DamyUser = {
  name: string,
  email: string,
  avatar: string,
}

function App() {
  const bigList: DamyUser[] = [...Array(5000)].map(() => ({
    name: faker.name.findName(),
    email: faker.internet.email(),
    avatar: faker.internet.avatar(),
  }))

  const renderRow = ({
    index,
    style,
  }: {
    index: number,
    style: React.CSSProperties,
  }) => (
    <div style={{ ...style, display: 'flex' }}>
      <img src={bigList[index].avatar} alt={bigList[index].name} width={50} />
      <p>
        {bigList[index].name} - {bigList[index].email}
      </p>
    </div>
  )
  return (
    <>
      <FixedSizeList
        height={window.innerHeight}
        width={window.innerWidth}
        itemCount={bigList.length}
        itemSize={50}
      >
        {renderRow}
      </FixedSizeList>
    </>
  )
}

export default App
```

### useFetch, Fetch コンポーネント

```jsx
import React, { useEffect, useState } from "react";

const useFetch = <T>(uri: string) => {
  const [data, setData] = useState<T>();
  const [error, setError] = useState<Error>();
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    if (!uri) return;
    setLoading(true);
    fetch(uri)
      .then((data) => data.json())
      .then(setData)
      .then(() => setLoading(false))
      .catch(setError);
  }, [uri]);

  return {
    data,
    error,
    loading,
  };
};

export default useFetch;
```

```jsx
import { ReactElement } from 'react'
import useFetch from '../hooks/useFetch'

type Prop = {
  uri: string,
  renderSuccess: (data: any) => ReactElement,
  loadingFallback?: ReactElement,
  renderError?: (e: Error) => ReactElement,
}

const Fetch = ({
  uri,
  renderSuccess,
  loadingFallback = <p>loading...</p>,
  renderError = (e) => <pre>{JSON.stringify(e, null, 2)}</pre>,
}: Prop) => {
  const { data, loading, error } = useFetch(uri)
  if (error) return renderError(error)
  if (loading) return loadingFallback
  if (data) return renderSuccess(data)

  return <></>
}

export default Fetch
```

## GraphQL

### REPL 環境

(Read Eval Print Loop)、インタプリンタにおいて対話的にコードを実行できる機能を指す。

## Suspense

なんとなく概念は理解してるつもり（Vue にも Suspense はあるので、それと同じだろうなという認識。）だけど、なんか理解度が不十分かな。

## Fiber

[https://www.velotio.com/engineering-blog/react-fiber-algorithm](https://www.velotio.com/engineering-blog/react-fiber-algorithm)

- React v16 から導入されたレンダリングのアルゴリズム

## ESlint まわり

- hooks 関連のプラグイン
  - eslint-plugin-react-hooks
- **a11y: accesibility (a と y の間に 11 個ある)**
- prettier はプリティアと呼ぶらしい。

## 型

### PropTypes

```jsx
import PropTypes from 'prop-types'

function App({ name }) {
  ;<div>{name}</div>
}

App.propTypes = {
  name: PropTypes.string.isRequired,
}
```

### Flow

Facebook が開発したオープンソースの型チェックツール。型チェック前に設定ファイルを記述（`.flowconfig`）する。//@flow と記述することで、型チェック対象にすることができる。

## サーバーサイド React

### アイソモーフィック

初回の描画をサーバーサイドで行うことで、SPA の苦手とする初期表示のスピードや、SEO を改善する。React の提供する SSR の機能を用いることで、実現可能。

- アイソモーフィックなアプリケーション
  - 複数のプラットフォームでレンダリング可能なアプリケーション
- ユニバーサルなアプリケーション
  - コードを書き換えることなく、複数のプラットフォームで実行可能なアプリケーション
  - → ブラウザだけでなく、Node でサーバーや CLI として実行される。

### ReactDom.hydrate

サーバーで ReactDOMServer により描画されたコンポーネントをブラウザで再描画できる。

- ブラウザはサーバーで構築された HTML を静的なページとして描画。（ユーザはこの時点でページが描画されたと認識）
- ブラウザは動的なページを構築するために必要な JS ファイルをロード
- コンポーネントの JS がロードされた時点で、React は静的なページを動的なページに切り替える。この時最初に描画されたＤＯＭを再利用しつつ、イベントハンドラのみを設定する。
- イベントハンドらが設定され、最終的にユーザーはコンポーネントを操作できるようになる。
