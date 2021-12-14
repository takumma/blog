---
title: "[Flutter] GoogleMapで複数の Widget をマーカーとして表示する"
slug: "flutter-google-map-widget-marker"
tags: ["tech", "flutter", "google-map"]
date: "2021/12/15"
---

# はじめに - Introduction

鈴鹿高専 Advent Calendar 2021 15 日目の記事です。

<embed-link src="https://qiita.com/advent-calendar/2021/snct"></embed-link>

Flutter で GoogleMap 上に Widget（カスタムマーカー）を表示する実装をしたときに、日本語でちゃんと書いてある記事が見当たらなくて苦戦したので、まとめておきます。

サンプルコードはこちら。

https://github.com/takumma/flutter_google_map_custom_marker_sample

#### バージョン情報など
```
$ flutter --version
Flutter 2.5.0 • channel stable • https://github.com/flutter/flutter.git  
Framework • revision 4cc385b4b8 (6 weeks ago) • 2021-09-07 23:01:49 -0700
Engine • revision f0826da7ef
Tools • Dart 2.14.0
```

使うパッケージはこれです。

<embed-link src="https://pub.dev/packages/google_maps_flutter"></embed-link>


実装したときに使った Version は、`^2.0.6` でした。

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

そして、そのマーカーをデフォルトのものから変更したい場合は、Marker に Icon プロパティを指定します。

```dart
Marker(
  markerId: MarkerId('marker-1'),
  position: LatLng(/*略*/),
  icon: _icon, // ここで指定する
),
```

このアイコンに指定するのは、[BitmapDescriptor](https://pub.dev/documentation/google_maps_flutter_platform_interface/latest/google_maps_flutter_platform_interface/BitmapDescriptor-class.html) です。
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

void func() {
  // これでウィジェットを取得できる。
  RenderRepaintBoundary boundary = iconKey.currentContext!.findRenderObject() as RenderRepaintBoundary;
}
```

## 全体感まとめ
ですので実装の流れとしては、

1. 画像にしたいコンポーネント(Widget)を作成
2. Widget を画面外に描画
3. 描画している Widget を画像に変換
4. 変換した画像を、BitmapDescriptor に変換
5. 変換したものを Marker のプロパティに指定して、 GoogleMap 上にマーカーを表示。

という感じになります。

# 実装

では、実装していきましょう。

## 1. 画像にしたいコンポーネントを作成
まず、画像にしたいコンポーネントを作成します。

```dart
class CustomMarker extends StatelessWidget {
  const CustomMarker(required this.number, {Key? key}) : super(key: key);

  final int number;

  @override
  Widget build(BuildContext context) {
    return SizedBox(
      height: 72.0,
      width: 72.0, 
      child: Stack(
        children: [
          Image.asset(
            'assets/marker_icon.png',
            fit: BoxFit.fill,
          ),
          Align(
            child: Container(
              margin: const EdgeInsets.only(bottom: 12),
              child: Text(
                number.toString(),
                style: const TextStyle(
                  fontWeight: FontWeight.bold,
                  color: Colors.white,
                  fontSize: 18.0,
                ),
              ),
            ),
          ),
        ],
      ),
    );
  }
}
```

ちなみに、今回の記事ではこういう感じのマーカーを表示させます。

<image-loader file="flutter-google-map-widget-marker/marker.png" alt="sample-marker" width="50"></image-loader>

## 2. Widget を画面外に描画
次は、作成したコンポーネントを、GoogleMap を表示しているページの画面外に描画します。

```dart
class MapPageState extends State<MapPage> {
  const MapPage({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: Stack(
        children: [
          Transform.translate(
            offset: const Offset(-400, 0), // 画面外に描画
            child: ListView.builder(
              itemCount: 4,
              itemBuilder: (_, index) => CustomMarker(index + 1),
            ),
          ),
        ],
      ),
    ),
  }
}
```

## 3. 描画している Widget を画像に変換
次に、描画している Widget を画像に変換する処理を記述していきます。

### MarkerData クラスの作成
まず、マーカーの表示に必要なデータをまとめたクラス `MarkerData` を作っておきます。

```dart
class MarkerData {
  MarkerData({required this.latLng});

  final LatLng latLng;
  final GlobalKey iconKey = GlobalKey();
  BitmapDescriptor? iconBitmap;
}
```

画像の変換に必要な GlobalKey・BitmapDescriptor とマーカーの位置情報を保持しています。

### _markerData の作成
`MarkerData` クラスを作成したら、マーカーの表示をするために `_markerData` を作成しておきます。

```dart
final List<MarkerData> _markerData =
      List.generate(4, (index) => MarkerData(latLng: LatLng(0, 5.0 * index)));
```

### RepaintBoundary で描画している Widget を Wrap
次に、描画している Widget を参照できるように Widget を Wrap し、GlobalKey から参照できるように key に `_markerData[index].iconKey` を指定します。

```diff
  body: Stack(
    children: <Widget>[
      Transform.translate(
        offset: const Offset(-400, 0), // 画面外に描画
-       child: ListView.builder(
-         itemCount: 4,
-         itemBuilder: (_, index) => CustomMarker(index + 1),
-     ),
+       child: ListView.builder(
+         itemCount: _markerData.length,
+         itemBuilder: (_, index) => RepaintBoundary(
+           key: _markerData[index].iconKey,
+           child: CustomMarker(index + 1),
+         ),
+       ),
      ),
      // ...
    ],
),
```

### Widget -> 画像に変換する処理を実装
`iconKey` から Widget を取得できるようになったので、ここから画像に変換する処理を実装していきます。Widget がレンダリングされたあとに処理をしたいので、`Future.delayed()`を行っています。

```dart
Future<Uint8List> _capturePng(GlobalKey iconKey) async {
    if (iconKey.currentContext == null) {
      await Future.delayed(const Duration(milliseconds: 20));
      return _capturePng(iconKey);
    }

    RenderRepaintBoundary boundary =
        iconKey.currentContext!.findRenderObject() as RenderRepaintBoundary;
    if (boundary.debugNeedsPaint) {
      await Future.delayed(const Duration(milliseconds: 20));
      return _capturePng(iconKey);
    }

    ui.Image image = await boundary.toImage(pixelRatio: 2.5);
    ByteData? byteData = await image.toByteData(format: ui.ImageByteFormat.png);
    var pngBytes = byteData!.buffer.asUint8List();
    return pngBytes;
  }
```

## 4. 変換した画像を、BitmapDescriptor に変換

次に、変換した画像を BitmapDescriptor に変換する処理を書いていきます。

```dart
void _getMarkerBitmaps() async {
  Future<void> _getMarkerBitmap(int index) async {
    final Uint8List imageData = await _capturePng(_markerData[index].iconKey);
    setState(() {
      _markerData[index].iconBitmap = BitmapDescriptor.fromBytes(imageData);
    });
  }

  final List<Future<void>> futures = [];
  for (int i = 0; i < 4; i++) {
    futures.add(_getMarkerBitmap(i));
  }

  await Future.wait(futures);
}
```

`_getMarkerBitmap` が画像 → BitmapDescriptor の変換をする処理で、 `_getMarkerBitmaps` では各マーカーの変換処理を行っています。

`_getMarkerBitmaps` は、build が完了した後に呼び出したいので、build 関数内で以下のように呼び出します。

```dart
@override
  Widget build(BuildContext context) {
    WidgetsBinding.instance!.addPostFrameCallback((_) => _getMarkerBitmaps());

    return Scaffold(
      // ...
    ),
```


## 5. 変換したものを Marker のプロパティに指定して、 GoogleMap 上にマーカーを表示。

最後に、変換した BitmapDescriptor を Marker の icon プロパティに指定して、GoogleMap 上のマーカーを変更します。BitmapDescriptor の取得処理（`_getMarkerBitmaps`）が完了するまでの措置として、`?? BitmapDescriptor.defaultMarker` を付けています。

```dart
GoogleMap(
  initialCameraPosition: const CameraPosition(
    target: LatLng(0, 0),
  ),
  markers: _markerData
      .map((markerData) => Marker(
            markerId: MarkerId(markerData.iconKey.toString()),
            icon: markerData.iconBitmap ??
                BitmapDescriptor.defaultMarker,
            position: markerData.latLng,
          ))
      .toSet(),
),
```

これで、GoogleMap 上に、Widget を使ったマーカーを表示できました。

<image-loader file="flutter-google-map-widget-marker/widget-custom-markers.png" alt="sample-marker" width="50"></image-loader>


# 番外編：マーカーを変更したことによって位置がずれたのを直す

設定する Widget や画像によっては、マーカーの指す位置がずれてしまう場合があります。
そのような場合は、`anchor` を設定して位置を調節すれば大丈夫です。

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
      icon: _customMarker,
      anchor: const Offset(0.18, 0.72), // ここで調節
    ),
  ].toSet(),
),
```

# 参考

https://pub.dev/documentation/google_maps_flutter_platform_interface/latest/

https://medium.com/swlh/using-material-icons-as-custom-google-map-markers-in-flutter-3e854de22e2