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

この状態で再度reactを立ち上げるとうまくいく。
また、この場合、HTMLの`class=`などの書き方は`className=`にするよう、よりReactっぽい書き方を要求されるようになる。

【参考】

* [ES5のReact.jsソースをES6ベースに書き換える](https://qiita.com/kuniken/items/2e850daa26a10b5098d6)

#### async/awaitが使えない

上記の内容に加えて、async/awaitはECMAScript2017以降に出てきたものなので、これに対応したものもいれないとうまくいかない。
よって、`babel-preset-es2017` を追加で入れれば解決する。

```sh
yarn add babel-preset-es2017
```

ただし、async/awaitで読み込こむことができても、非同期処理のため、`onSubmit` にフックするようにする前に、`event`をストップさせる必要があるので、通常の`function` と併用する必要がある。

#### 環境変数を使いたい
Reactはデフォルトで`dotenv`をインストールしていて、buildする時にここに設定されたものを読み込んでくれる。そのため`.env`ファイルを作成したら、そこで設定した値を読み込んで実行してくれる。
`${paths.dotenv}.${NODE_ENV}.local`, `${paths.dotenv}.${NODE_ENV}` で`.env`ファイルを読み込んでくれるので環境ごとに実行結果を分けることもできる。
例えば`development`で`local`の環境変数を使いたい場合、`.env.development.local`というファイルを作って、そこに環境変数を埋め込めばいい。同様に`production` ならば `.env.production`というファイルを作ればいい。
また、Reactの中で`dotenv`で設定された値を`process.env`で使う場合、`REACT_APP_xxx`と言うように先頭に`REACT_APP_`をつけたものにしないと使用できない。

【参考】

* [Reactにおける環境変数を設定について、ようやく理解したので原因と共にまとめてみる_100DaysOfCodeチャレンジ38日目(Day_38:#100DaysOfCode)](https://qiita.com/yuta-ushijima/items/a653e9ca4847276f19cd)

#### リンクを押したら画面を遷移したい(Router)
Reactの特徴としてSPAがある。一つのページだけに完結するようなことはなく、アプリ内の他のページに遷移する必要がある。そのようなものを実装するにはどうしたらいいか解説してみる。

#### とあるCompomentで取得した値を他のCompomentで使いたい(Redux + Flux)
Reactの特徴の一つであるデータバインディングみたいなものを使いたい。
今回の場合、GoogleでOAuth認証をして認証後に取得できるAccessTokenをサーバーにリクエストするときに一緒に送りたい。認証が完了したときに、Formの中にこのAccessTokenを埋め込むにはどうしたらいいか考えてみる。

【参考】

 * [React+Fluxで正しく設計するためのFlux見直しガイド](https://aloerina01.github.io/blog/2018-09-14-1)
 * [Redux](https://redux.js.org/)

#### localhostのAPIにrequestしたらエラーになった

expressで起動しているserverはlocalhostからrequestを受け取ると以下のようなエラーが出る。

`react has been blocked by CORS policy: No 'Access-Control-Allow-Origin' header is present on the requested resource.`

これは[Express](https://github.com/expressjs/express)側の問題で[CORS](https://github.com/expressjs/cors)というライブラリを使うようにしたら解決する。

```sh
yarn add cors
```

そして、以下のように修正する

```javascript
var express = require('express');
// Import the library:
var cors = require('cors');

var app = express();

// Then use it before your routes are set up:
app.use(cors());
```

【参考】

* [Access-Control-Allow-Origin: Dealing with CORS Errors in React and Express](https://daveceddia.com/access-control-allow-origin-cors-errors-in-react-express/)

### Google Slide APIを作ってSlide作成
#### 準備
[Google Cloud Console](https://console.cloud.google.com/)にてAPIを登録して、Google DriveとGoogle SlideのAPIを使えるようにする。また、OAuth認証に必要な設定を解放しておく。

### Reactサイドの準備
[react-google-login](https://github.com/anthonyjgrove/react-google-login)というのがあるようなのでインストールして、ドキュメント読みながらよしなにやる。(Reactの中だけで完結しそう)

### Google Slide APIを使ってGoogle Slideを新しく作る
[google-api-nodejs-client](https://github.com/googleapis/google-api-nodejs-client)を使う。

#### Google Slide APIについて
Google Slide APIはなかなかの曲者であるので[こちら](https://developers.google.com/slides/)の`How To...`以下を参考に何ができそうなのかということの参考にしていく方がいい。

#### 認証情報など
[react-google-login](https://github.com/anthonyjgrove/react-google-login)で`accessToken`や`refreshToken`は取得済みのはずなのでこれらを用いる

```javascript
const { google } = require('googleapis');
const oauth2Client = new google.auth.OAuth2(process.env.GOOGLE_OAUTH_CLIENT_ID, process.env.GOOGLE_OAUTH_CLIENT_SECRET);
oauth2Client.setCredentials({access_token: accessToken}); // あるいはoauth2Client.setCredentials({refresh_token: refreshToken});
const googleSlides = google.slides({ version: "v1", auth: oauth2Client });
```

これでうまくいってれば、`googleSlides`では各Google Slide APIを実行できるようになっているはず。

#### Presentationの作成
```javascript
const presentationResponse = await googleSlides.presentations.create({title: "slide_name"});
```
上記のようなコードで新しいPresentationが作成される。APIへのリクエストは内部ではaxiosを使っているようなので、responseはaxiosのresponseと同じもの。また`create`の中が空Objectでも別に構わない。

#### Presentationの中でSlide(Page)を作成
いろんなものをよしなに作るものとして`batchUpdate`メソッドがある。Slideを作ったり何かを挿入したりする時は`batchUpdate`を呼ぶ時にいろんなものを付け加えて実行する。
以下のような感じで実行することでGoogle Slideに各種操作ができる。

```javascript
  const slides = await googleSlides.presentations.batchUpdate({
    presentationId: presentationResponse.data.presentationId,
    resource: {
      requests: [
        requestObject,
      ],
    },
  });
```

`presentationId` はpresentationを作成したときにできているはずなので、その値を用いる。
`resource` はGoogle Slide APIにリクエストを投げる時のRequest Bodyにあたり、ここ以下の内容をJSONにしてAPIにリクエストが投げられる。
`requests`以下には実行してほしいものの情報が列挙して並べる。`requestObject`の中身は[APIドキュメント](https://developers.google.com/slides/reference/rest/v1/presentations/request)の中の形式を形作っていれる。

新しくスライドを作るのなら以下のような`createSlide`をいれた[CreateSlideRequest](https://developers.google.com/slides/reference/rest/v1/presentations/request?hl=ja#CreateSlideRequest)の形をいれる。

```javascript
  const slides = await googleSlides.presentations.batchUpdate({
    presentationId: presentationResponse.data.presentationId,
    resource: {
      requests: [
        createSlide: {
          objectId: "slideObjectId",
        },
      ],
    },
  });
```

この時、`objectId`には5文字以上のpresentationの中で一意になるような、5文字以上の`string`を指定する。

#### Slideの中に画像を挿入
上記で作成したSlideの中に画像を挿入するには`createImage`をいれた[CreateImageRequest](https://developers.google.com/slides/reference/rest/v1/presentations/request?hl=ja#CreateImageRequest)の形をいれる。

```javascript
  const slides = await googleSlides.presentations.batchUpdate({
    presentationId: presentationResponse.data.presentationId,
    resource: {
      requests: [
        createImage: {
          objectId: "imageObjectId",
          url: "https://[image_url]",
          elementProperties: {
            pageObjectId: "slideObjectId",
          },
        },
      ],
    },
  });
```

この時、`objectId`にはslideとは別の一意になるようなObjectIdをいれる。`pageObjectId`で画像を差し込みたいSlideを指定している。ここでは画像はURLを指定したものでなければならない。

## デザイン系で参考にしたもの

* [配色アイデア手帖 めくって見つける新しいデザインの本［完全保存版］ [ 桜井 輝子 ]](https://hb.afl.rakuten.co.jp/hgc/18ab110a.e78ad517.18ab110b.3a837bfb/?pc=https%3A%2F%2Fitem.rakuten.co.jp%2Fbook%2F15176294%2F&m=http%3A%2F%2Fm.rakuten.co.jp%2Fbook%2Fi%2F18822066%2F&link_type=text&ut=eyJwYWdlIjoiaXRlbSIsInR5cGUiOiJ0ZXh0Iiwic2l6ZSI6IjI0MHgyNDAiLCJuYW0iOjEsIm5hbXAiOiJyaWdodCIsImNvbSI6MSwiY29tcCI6ImRvd24iLCJwcmljZSI6MSwiYm9yIjoxLCJjb2wiOjEsImJidG4iOjF9)
