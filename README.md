# AutoSlideGenerator

自動でなんかプレズンスライド作れちゃうものです。

個人的にあったらいいなと思ったので作りました。

# 使っている技術やツール
 * Node.js(front/server)
 * Frontend
   * [React](https://reactjs.org)
   * [Pure](https://purecss.io/)
 * AWS
   * ApiGateway
   * Lambda
   * DynamoDB
 * [けものフレンズ ロゴジェネレーター](https://aratama.github.io/kemonogen/)
 * Google API(Google Slide 投稿用)

# 画像を集めている先(随時追加予定)
 * Google画像検索
 * Twitter
 * Flickr

# 作っていく中でのメモ
特にReactは初めてなので、各種メモしながら進めます

## Init
 * [create-react-app](https://github.com/facebook/create-react-app)を使ってスタート

```
yarn create react-app auto-slide-generator
```
 * とりあえず、動かしてみてみる

```
npm start
```

## バラす
 * ejectをすることでReactプロジェクトをバラバラにしていく(その前にCommitしておいたほうがいい)
```
npm run eject
```

# デザイン系で参考にしたもの
 * [配色アイデア手帖 めくって見つける新しいデザインの本［完全保存版］ [ 桜井 輝子 ]](https://hb.afl.rakuten.co.jp/hgc/18ab110a.e78ad517.18ab110b.3a837bfb/?pc=https%3A%2F%2Fitem.rakuten.co.jp%2Fbook%2F15176294%2F&m=http%3A%2F%2Fm.rakuten.co.jp%2Fbook%2Fi%2F18822066%2F&link_type=text&ut=eyJwYWdlIjoiaXRlbSIsInR5cGUiOiJ0ZXh0Iiwic2l6ZSI6IjI0MHgyNDAiLCJuYW0iOjEsIm5hbXAiOiJyaWdodCIsImNvbSI6MSwiY29tcCI6ImRvd24iLCJwcmljZSI6MSwiYm9yIjoxLCJjb2wiOjEsImJidG4iOjF9)
