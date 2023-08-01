// path ライブラリ
const path = require('path');
// Express ライブラリの呼び出し
const express = require('express');
// Express ライブラリからサーバーの仕組みを app 変数として呼び出す
const app = express();

// public フォルダ内にあるファイルはパスが一致していると呼びだせます
// /index.html や / の場合は public フォルダ内の index.html が表示されます
app.use(express.static(__dirname + '/public'));

// POST データを受け取る際に必要な処理
app.use(express.urlencoded({ extended: true }));
// データを JSON データとして受け取る処理
app.use(express.json())

// 現在のポイントを記録する変数
// サーバープログラム内の変数なのでメモリで動いているので再起動すると初期化されますが起動時は記録してくれています
let recordPoint = 0;

// 初回ロード時にいろいろな情報をもらう
// /api/post/init というパスで POST リクエストでアクセスするとデータが取得できます
app.post('/api/post/init', (req, res) => {
  console.log('/api/post/init 受信');
  // 受信したデータ
  console.log(req.body);
  // あいさつ文の値
  let title = "";
  // 受信した name 値の有無で文言が変わる
  if(req.body.name){
    title = `こんにちは！${req.body.name}さん、ようこそ！`;
  } else {
    title = "こんにちは！ようこそ！";
  }
  // 送るデータを JavaScript のオブジェクトで作る
  const responseData = {
    "result":"OK",
    "title":title,  // あいさつ文
    "add_point":1,  // 加算ポイント
    "recordPoint":recordPoint // 記録している現在のポイント
  };
  // res.json はオブジェクトを JSON 形式で返答します
  res.json(responseData)
});

// 現在のポイント受信して記録。さらに今記録したものを返答。
// /api/post/result というパスで POST リクエストでアクセスするとデータが取得できます
app.post('/api/post/result', (req, res) => {
  console.log('/api/post/result 受信');
  // 受信したデータ
  console.log(req.body);
  // 受信した現在のポイントを記録
  recordPoint = req.body.point;
  console.log(`${recordPoint} pt 記録`);
  // 送るデータを JavaScript のオブジェクトで作る
  const responseData = {
    "result":"OK",  // OK 結果
    "recordPoint":recordPoint  // 
  };
  // res.json はオブジェクトを JSON 形式で返答します
  res.json(responseData)
});

// サーバーを 8080 ポートで起動してログを出力
app.listen(process.env.PORT || 8080, () => {
  console.log(`${path.basename(__filename)} start!`);
  console.log(`app listening at http://localhost:${process.env.PORT || 8080}`)
})