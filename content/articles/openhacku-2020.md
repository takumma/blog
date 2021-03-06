---
title: "HackU2020参加記"
slug: "openhacku-2020"
tags: ["poem", "hackathon"]
date: "2021/03/28"
---

2021 年春に開催された OPEN HACK U 2020 (vol.5)に参加したので、参加記を書きます。

# メンバー

今回は同級生４人と５人チームで参加しました。もともとは高専プロコンに向けて結成したチームなのですが、Hack U の話がメンバー内でも出ていたので参加を決めました。

役割分担は、
- フロントエンド・デザイナー担当
- フロントエンド担当 <- ぼく
- バックエンド担当
- デバイス周り担当
- プレゼン担当

お互いの得意分野がうまいこと分かれていていいかんじです。

# 作ったもの

**Liverary** という子供の語彙の増加を可視化するアプリを作りました。

<image-loader file="liverary.png" alt="liverary"></image-loader>

デバイス（HackU ではラズパイ）のマイクから子供の音声を取得して文字起こしをしサーバーへ送信。サーバーで形態素解析にかけて語彙を抽出し、DB に保存。クライアントで収集した語彙を朝顔の葉に載せてみることができるアプリです。

技術構成は以下のようになっています。

<image-loader file="liverary-tech.png" alt="liverary tech"></image-loader>

# 僕が担当したところ

僕はフロントのビジネスロジックとか状態管理周りを担当していました。もう一人のフロントさんがデザインとかに興味がある方で、僕は反対にこういったビジネスロジックとかに興味があるので、割とこういう役回りになることは多いです（というかほとんどそう）。

### Vue3 × ionic

フロントは Vue3 × ionic という構成でした。一度この構成は別のハッカソンで試したことがあったんですが、その時は Vue3 が出たばかりでまだ情報も少なくて四苦八苦した覚えがあります。さらに Composition API の知識が全くなくて怖かったので当時は Options API で書いていました。

### Composition API への移行

今回は、始まってすぐは Opstions API で書いてたんですが、折角なので途中で全て Composition API に書き直しました。個人的には Composition API はかなりきれいに記述できるなと感じました。ちゃんと分類しないと computed と普通のメゾッドが混ざって崩壊するものの、そこをしっかりとすれば書きやすくていいなと感じました。this がコードから消えるのもめっちゃいい。Typescript との相性も Vuex4 なども含めてかなり良くなった気がします。

Composition API 触ってから、property-decorator とかを使うのに凄く違和感を感じるようになってしまいました。もう虜になってますね...。このブログは今 property-decorator で書いているんですが、今後改修しそうなら Composition API への移行も検討しようと思います。

### 認証周り

認証には jwt トークンを使用しました。firebase はサーバーレスで使ったことしかなかったのでここら辺の実装は初めてで楽しかったです。フロントエンド周りのセキュリティに最近興味があるのでもっと勉強したい。

# 振り返り

ここからは時系列にそって振り返ろうと思います。

## ～キックオフ

キックオフまではコード書くの禁止なので、コードを書く以外の事をチームでやってました。
やったこととしては、

- アイデア出し
- 出たアイデアの中から作るもの決定
- 技術選定
- その他諸々...

アイデア出しなどは高専プロコンの方も兼ねてたんですが、とにかくキックオフと同時に開発をスタートできるように準備していました。

## キックオフ初日

日付が 14 日から 15 日に切り替わった瞬間に開発をスタートしました。（といいつつ、僕は寝てました。）僕が起きて PC 開いた時には、フロントは必要なものをセットアップしたり土台的な部分を大体実装されており、サーバーはサンプルの API を作ってくれていました。なので、僕が開発するのに必要なものが全て用意されていてスムーズに開発が開始できました。

この時のスタートダッシュがかなり大きくて、フロント側は初日からサーバーの進捗を気にせずにガツガツ開発できました。また、開発初期のうちにある程度のクオリティまで作れたので後述するなんでも相談会でもその分いろんな話をできました。

## なんでも相談会（3/18）

なんでも相談会では、ヤフーのメンターさんたちに色々と相談ができました。この時まで、結構脳死でコードを書いてた記憶があるので、ここで 1 回プロダクトと向き合うことが出来てよかったなと思います。

## 3/21ごろ

その後はフロント側ではタスクを一度洗いだして、issue に全部書き出して優先順位を決めて開発がヒートアップしていました。滅茶苦茶楽しい。

そして土日あたりにはプロダクトはほぼ完成しました。これは多分参加してるチームの中でもかなり早い方だったんじゃないかなと思ってます。というかハッカソンでこれくらい余裕持って開発が終わったことが無かったのでなんか変な気分でした。

## ～発表前日まで

それから発表前日までは、細かい修正をしながら、スライドを練っていました。といいつつ、僕はほぼ何もしていませんでした。（なんならこのブログを開発してた）

## 発表当日

発表当日は、発表しないのにひとりで勝手に緊張していました。発表が無事成功し、展示会もやり終えて HackU が終了しました。発表を見ているのも緊張したんですが、展示会のことはチームの中でも全然準備してなくてめっちゃ焦ってた記憶があります。ここは少し反省点だったなと思います。

# まとめ

全体的にすごく楽しかったです。それぞれの得意な領域でガツガツ開発したのは爽快感があったし、技術的なチャレンジもいくつかできて学びも多かったです。プロダクトに関してもしっかり練って作れてよかったです。賞はとれませんでしたが、しっかりとチームで反省して次につなげられるようにできたと思います。
