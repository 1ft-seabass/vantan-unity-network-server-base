// Express ライブラリの呼び出し
const express = require('express');
// Express ライブラリからサーバーの仕組みを app 変数として呼び出す
const app = express();

// public フォルダ内にあるファイルはパスが一致していると呼びだせます
// /index.html や / の場合は public フォルダ内の index.html が表示されます
app.use(express.static(__dirname + '/public'));

// /api/get/sample というパスで GET リクエストでアクセスすると GET OK! が取得できます
// GET リクエストなのでブラウザから見れます
app.get('/api/get/sample', (req, res) => {
  console.log('GET Response!');
  res.send('GET OK!')
});

// /api/post/sample というパスで POST リクエストでアクセスすると POST OK! が取得できます
app.post('/api/post/sample', (req, res) => {
  console.log('POST Response!');
  res.send('POST OK!')
});

// サーバーを 8080 ポートで起動してログを出力
app.listen(process.env.PORT || 8080, () => {
  console.log("term1-2-chapter01 start!");
  console.log(`app listening at http://localhost:${process.env.PORT || 8080}`)
})