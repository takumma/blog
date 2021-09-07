---
title: "Flutterでの引数の使い分け"
slug: "using-different-arguments-in-flutter"
tags: [ "flutter", "dart" ]
date: "2021/09/07"
---

# はじめに

Flutter(Dart)で、引数の渡し方の使い分けを考えることが何度かあったのでそれをまとめます。

Flutter か Dart かで表現を迷いますが、Flutter での実装の話も少しあるので、Flutter で統一します。

# ３種類の引数

Flutter（Dart）の引数の渡し方は、主に３つあります。

## 普通に渡す（）

1 つは普通に渡す方法です。

```dart
void func(String arg1, double arg2) {}

void main() {
  func("foo", 3.14);
}
```

この場合、使用する側は、定義側の順番に従って指定する必要があります。


## オブジェクト引数（名前付き任意引数）でわたす。

もう 1 つはオブジェクト引数で渡す方法です。オブジェクト引数は `{}` をつけて指定します。`required` をつけることで、必須であることを示すことができます。また、デフォルト値の指定もできます。

```dart
void func({String arg1 = "bar", required double arg2}) {}

void main() {
  func(arg1: "foo", arg2: 3.14);

  func(arg2: 1.25);
}
```

使用する側は、渡す引数名を指定して渡す必要があります。任意ですので、`required` をつけていない引数に関しては、指定しないこともできます。

## 順序付き任意引数でわたす

最後は順序付き任意引数で渡す方法です。順序付き任意引数は `[]` をつけて指定します。
デフォルト値の設定もできます。

```dart
void func([String arg1 = "bar", double arg2])

void main() {
  func();

  func("bar");

  func("bar", 3.14);

  // error!
  func(3.14);
}
```

順序付き任意引数は、後の引数を指定するときそれより手前の引数も指定する必要がある引数です。分かりづらいですが、上のサンプルコードの場合は、`arg2` を指定したいときは一緒に `arg1` も指定する必要があるということです。

# それぞれの使い分け方

結論から言うと、私は基本的に必須項目であったり引数が分かりやすいものであれば普通の引数、任意のものがあったり多数の引数がある場合であればオブジェクト引数を使って、必要なところで順序付き任意引数を使うのがいいと思います。まあ基本は名前の通りに使うのがいいと思います。

ただ、Dart 2.12.0（Null Safety 導入）から linter 入れないと warning すら出なかった `@required` が `required` に変わり、オブジェクト引数で必須の値を扱いやすくなったと思います。

あと、いくつか取り上げたい例もあります。

## bool 型の場合

まずは bool 型を引数にとりたい場合です。

https://dart.dev/guides/language/effective-dart/design#parameters

上記にもあるように、bool 型の場合は何の値を指定しているのか分かりずらくなってしまうのでオブジェクト引数にしましょう。

```dart [bad]
void func(bool isLoading, bool isEnabled) {}

void main() {
  // 何が何を指定しているのかさっぱりわからん
  func(true, false);
}
```

```dart [good]
void func({bool isLoading, required bool isEnabled}) {}

void main() {
  // 何が何を指定しているのかわかりやすい
  func(
    isLoading: true,
    isEnabled: false,
  );
}
```

## 普通に渡す方法とオブジェクト引数を組み合わせる

普通に渡すのとオブジェクト引数を組み合わせる方法もあります。

```dart
void func( String text, {bool isEnabled}) {}

void main() {
  // 何が何を指定しているのかわかりやすい
  func(
    "foo",
    isEnabled: false,
  );
}
```

必須で渡したい引数とオプションで渡したい引数がある場合に便利です。
これが使われている分かりやすい例が、Flutter の `Text` ウィジェットです。

```dart
Column(
  children: [
    Text("foo"),
    Text("bar", style: TextStyle(fontSize: 24.0)),
  ]
)
```

`Text` ウィジェットの場合は、表示する文字列は毎回必ず指定して、style などは必要な時に指定するのでこの組み合わせる方法が使われています。


## 引数が分かりずらくなる場合
以下の例を見てください（Flutter の想定）

```dart
class SampleWidget extends StatelessWidget {
  
  const SampleWidget(this.onSubmit, this.onCancel, {Key key}) : super(key: key);

  final Function() onSubmit, onCancel;

  // ...

}

/// 使う側
Container(
  child: SampleWidget(
    () => func1(),
    () => func2(),
  ),
)
```

このような場合、どちらの関数がいつ実行されるのかが分かりずらくなってしまいます。分かりずらくなっているので、例えばキャンセルしたときに実行したい関数が、Submit したときに実行されてしまったりというバグの原因にもなってしまいます。

ですので、このような場合には、オブジェクト引数で渡す方がいいと思います。

```dart
class SampleWidget extends StatelessWidget {
  
  const SampleWidget({
    this.onSubmit,
    this.onCancel,
    Key key,
  }) : super(key: key);

  final Function() onSubmit, onCancel;

  // ...
}

/// 使う側
Container(
  child: SampleWidget(
    onSubmit: () => func1(),
    onCancel: () => func2(),
  ),
)
```

## 引数が複数ある場合

分かりずらくなる引数と同様に、複数ある場合もオブジェクト引数で渡すのがいいと思います。

```dart
void func1(String title, String subtitle1, String subtitle2, /* ... */) {}

void func2({String title, String subtitle1, String subtitle2, /* ... */}) {}

void main() {
  func1(
    "foo",
    "bar",
    "hoge",
    // ...
  );
  
  func2(
    title: "foo",
    subtitle1: "bar",
    subtitle2: "hoge",
    // ...
  );
}
```

おわり。