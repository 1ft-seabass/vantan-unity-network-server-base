// Express ライブラリの呼び出し
const express = require('express');
// Express ライブラリからサーバーの仕組みを app 変数として呼び出す
const app = express();

// public フォルダ内にあるファイルはパスが一致していると呼びだせます
// /index.html や / の場合は public フォルダ内の index.html が表示されます
app.use(express.static(__dirname + '/public'));

// bodyParser の設定
// ※現在はひとまず置いておけばよい処理
app.use(express.json())
app.use(express.urlencoded({ extended: true }));

// /api/get/sample というパスで GET リクエストでアクセスすると GET OK! が表示されます
app.get('/api/get/sample', (req, res) => {
  res.send('GET OK!')
});

// /api/post/sample というパスで POST リクエストでアクセスすると POST OK! が表示されます
app.post('/api/post/sample', (req, res) => {
  res.send('POST OK!')
});

// サーバーを 8080 ポートで起動してログを出力
app.listen(process.env.PORT || 8080, () => {
  console.log("server01 start!");
  console.log(`app listening at http://localhost:${process.env.PORT || 8080}`)
})