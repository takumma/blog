---
title: "Markdownサンプル"
slug: "markdown-sample"
tags: ["markdown"]
date: "2021/03/12"
---

```
This is markdown notation sample.

これはマークダウンのサンプルです。

This is markdown notation sample.
これはマークダウンのサンプルです。
```

This is markdown notation sample.

これはマークダウンのサンプルです。

This is markdown notation sample.
これはマークダウンのサンプルです。

```
# 見出し h1

## 見出し h2

### 見出し h3

#### 見出し h4

##### 見出し h5
```

# 見出し h1

## 見出し h2

### 見出し h3

#### 見出し h4

##### 見出し h5


# リスト
```
# リスト
- list1
- list2
  - list2-1
  - list2-2
    - list2-2-1
- list3
```

- list1
- list2
  - list2-1
  - list2-2
    - list2-2-1
- list3


# 番号付きリスト
```
1. first
2. second
```

1. first
2. second


# コードブロック

## シンプル

> \`\`\`<br>
> \`\`\`

```
$ sudo rm -rf /
```


## シンタックスハイライト・ファイル名

> \`\`\`js [sample.js]<br>
> \`\`\`

```js [sample.js]
fuction foo() {
  var a = bar();
  const b = 12;
  return a + b;
}
```

## diff 記法

> \`\`\`diff<br>
> \`\`\`

```diff
+ const a = 1
- var b = 2
```


# テキスト装飾

## インラインコード

```
`foo()`
```

`foo()`


## 水平線

```
---
```

---


## 斜体・強調・取り消し線

```
*italicText*

**strongText**

~~StrikethroughText~~
```

*italicText*

**strongText**

~~StrikethroughText~~


# 埋め込みリンク

## Youtube

```
<youtube-card id="4AoFA19gbLo"></youtube-card>
```

<youtube-card id="4AoFA19gbLo"></youtube-card>


## Twitter

```
<tweet-card id="1360343880760131584"></tweet-card>
```

<tweet-card id="1360343880760131584"></tweet-card>


## Others

```
<embed-link src="https://blog.takumma.net/"></embed-link>
```
<embed-link src="https://blog.takumma.net/"></embed-link>
