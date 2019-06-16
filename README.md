# AutoSlideGenerator

自動でなんかプレズンスライド作れちゃうものです。

[AutoSlideGenerator](https://takukobayashi.github.io/AutoSlideGenerator/)

個人的にあったらいいなと思ったので作りました。

## 使っている技術やツール

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

## 画像を集めている先(随時追加予定)

* Google画像検索
* Twitter
* Flickr

## 作っていく中でのメモ

特にReactは初めてなので、各種メモしながら進めます

### Init

* [create-react-app](https://github.com/facebook/create-react-app)を使ってスタート

```sh
yarn create react-app auto-slide-generator
```

* とりあえず、動かしてみてみる

```sh
npm start
```

### バラす

* ejectをすることでReactプロジェクトをバラバラにしていく(その前にCommitしておいたほうがいい)

```sh
npm run eject
```

### Tips

#### Buildした時に画面が真っ白になる件の対策

どうやら、ReactでBuildすると絶対パスで読み込められてしまうようです。
対策として`package.json`に以下のように`"homepage": "."`と追加することで、`build`した時に相対パスを読み込んでくれるようになる。

```package.json
  "homepage": "."
```

※ Github Pagesなどにdeployした時にうまく反映されないことがある。その時はブラウザのキャッシュを消すことを試してみるといい。

【参考】

* [[フロントエンド] create-react-appのビルド結果で、js/cssを相対パスで読み込みたい](https://www.yoheim.net/blog.php?q=20180418)

他

#### Build先のディレクトリを変更する

Github Pagesに出力したいので`build`ディレクトリではなく`一つ前のdocs`ディレクトリに出力してくれると楽なので調整を入れたい。
その場合は `/config/paths.js` の

```javascript
module.exports = {
  dotenv: resolveApp('.env'),
  appBuild: resolveApp('build'),
  ...
```

を

```javascript
module.exports = {
  dotenv: resolveApp('.env'),
  appBuild: resolveApp('../docs'),
  ...
```

このように変更すればいい。

【参考】

* [create-react-appでbuild先のパスを変更する](https://qiita.com/yakimeron/items/7a4f8d9e70a4a2b1b96b)

#### 外部にClassを作って読み込んだらエラーになる

どうやら、ReactではそのままだとECMAScript2016以降の書き方をしているとうまく拾ってくれないらしい。
よって、`babelify` `babel-preset-es2015` `babel-preset-react` を追加で入れる必要がある。

```sh
yarn add babelify babel-preset-es2015 babel-preset-react
```
この状態でサイドreactを立ち上げるとうまくいく

【参考】

* [ES5のReact.jsソースをES6ベースに書き換える](https://qiita.com/kuniken/items/2e850daa26a10b5098d6)

## デザイン系で参考にしたもの

* [配色アイデア手帖 めくって見つける新しいデザインの本［完全保存版］ [ 桜井 輝子 ]](https://hb.afl.rakuten.co.jp/hgc/18ab110a.e78ad517.18ab110b.3a837bfb/?pc=https%3A%2F%2Fitem.rakuten.co.jp%2Fbook%2F15176294%2F&m=http%3A%2F%2Fm.rakuten.co.jp%2Fbook%2Fi%2F18822066%2F&link_type=text&ut=eyJwYWdlIjoiaXRlbSIsInR5cGUiOiJ0ZXh0Iiwic2l6ZSI6IjI0MHgyNDAiLCJuYW0iOjEsIm5hbXAiOiJyaWdodCIsImNvbSI6MSwiY29tcCI6ImRvd24iLCJwcmljZSI6MSwiYm9yIjoxLCJjb2wiOjEsImJidG4iOjF9)
