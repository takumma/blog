---
title: "[Flutter] GoogleMapでWidgetをマーカーとして表示する"
slug: "flutter-google-map-widget-marker"
tags: ["tech", "flutter"]
date: "2021/10/21"
---

takumma です。

# はじめに - Introduction

Flutter で GoogleMap 上に Widget を表示する実装をしたときに、日本語でちゃんと書いてある記事が見当たらなかったので記事にまとめます。

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
      markerId: MarkerId('marker-id'),
      position: LatLng(/*略*/),
    ),
  ].toSet(),
),
```

で、そのマーカーをデフォルトのものから変更したい場合は、Marker に Icon プロパティを指定します。

```dart
Marker(
  markerId: MarkerId('marker-id'),
  position: LatLng(/*略*/),
  icon: _icon, // ここで指定する
),
```

で、このアイコンに指定するのは、![BitmapDescriptor](https://pub.dev/documentation/google_maps_flutter_platform_interface/latest/google_maps_flutter_platform_interface/BitmapDescriptor-class.html) です。
なので、Widget をアイコンとして表示させたい場合はうまいこと Widget からこの BitmapDescriptor に変換した上げる必要があります。

BitmapDescriptor は画像から変換できるので、実装では、

# 参考