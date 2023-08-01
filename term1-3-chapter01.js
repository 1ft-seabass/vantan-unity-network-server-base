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

// /api/post/result というパスで POST リクエストでアクセスすると OK が表示されます
app.post('/api/post/result', (req, res) => {
  console.log('/api/post/result 受信');
  // 受信したデータ
  // app.use(express.json()) のおかげで JSON データを受信できてる
  console.log(req.body);
  // 送るデータを JavaScript のオブジェクトで作る
  const responseData = {
    "result":"OK"
  };
  // res.json はオブジェクトを JSON 形式で返答します
  res.json(responseData)
});

// サーバーを 8080 ポートで起動してログを出力
app.listen(process.env.PORT || 8080, () => {
  console.log(`term1-3-chapter01 start!`);
  console.log(`app listening at http://localhost:${process.env.PORT || 8080}`)
})