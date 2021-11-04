---
title: "[Flutter] GoogleMapで複数の Widget をマーカーとして表示する"
slug: "flutter-google-map-widget-marker"
tags: ["tech", "flutter"]
date: "2021/10/21"
---

takumma です。

# はじめに - Introduction

Flutter で GoogleMap 上に Widget を表示する実装をしたときに、日本語でちゃんと書いてある記事が見当たらなかったのでまとめます。

#### バージョン情報など
```
$ flutter --version
Flutter 2.5.0 • channel stable • https://github.com/flutter/flutter.git  
Framework • revision 4cc385b4b8 (6 weeks ago) • 2021-09-07 23:01:49 -0700
Engine • revision f0826da7ef
Tools • Dart 2.14.0
```

使うパッケージはこれです。

https://pub.dev/packages/google_maps_flutter

実装したときに使った Version は、`^2.0.6` でした。（マイナーバージョンの違いならあんまり関係ないとは思います。多分）

# 全体感の説明

実装する前に、実装の全体感を説明しておきます。
いらない人は飛ばして下さい。

## Marker の表示

まず、`GoogleMap` でマーカーを表示するには、`markers` プロパティで `Marker`
(の Set) を指定する必要があります。

```dart
GoogleMap(
  mapType: MapType.normal,
  initialCameraPosition: _kGooglePlex,
  onMapCreated: (GoogleMapController controller) {
    _controller.complete(controller);
  },
  markers: [
    Marker(
      markerId: MarkerId('marker-1'),
      position: LatLng(/*略*/),
    ),
    Marker(
      markerId: MarkerId('marker-2'),
      position: LatLng(/*略*/),
    ),
  ].toSet(),
),
```

で、そのマーカーをデフォルトのものから変更したい場合は、Marker に Icon プロパティを指定します。

```dart
Marker(
  markerId: MarkerId('marker-1'),
  position: LatLng(/*略*/),
  icon: _icon, // ここで指定する
),
```

で、このアイコンに指定するのは、![BitmapDescriptor](https://pub.dev/documentation/google_maps_flutter_platform_interface/latest/google_maps_flutter_platform_interface/BitmapDescriptor-class.html) です。
なので、Widget をアイコンとして表示させたい場合はうまいこと Widget からこの BitmapDescriptor に変換したものを上げる必要があります。

そして BitmapDescriptor は画像(正確には byte データ)から変換できます。なので、
```
Widget(Widgetツリー) -> 画像 -> BitmapDescriptor 
```
という変換が必要になります。

## Widget を画像に変換

Widget を画像にするにもいくつか手間が必要です。
Widget を画像に変換するには、まず変換する Widget を `RapaintBoundary` Widget でラップする必要があります。そしてその `RapaintBoundary` に Global Key を指定し、その指定した Global Key を使って画像に変換します。
簡単なコードで表すと以下のような感じです。

```dart
@override
Widget build(BuildContext context) {
  return RepaintBoundary(
    key: _globalKey,
    child: Container(), // ここに、画像にするWidgetを入れる。
  );
}


```



ですので実装の流れとしては、

1. Widget を画面外に描画
2. 描画している Widget を画像に変換
3. 変換した画像を、BitmapDescriptor に変換
4. 変換したものを Marker のプロパティに指定して、 GoogleMap 上にマーカーを表示。

という感じになります。

# 実装

では、実装していきましょう。

# 参考

https://pub.dev/documentation/google_maps_flutter_platform_interface/latest/

https://medium.com/swlh/using-material-icons-as-custom-google-map-markers-in-flutter-3e854de22e2