// Express ライブラリの呼び出し
const express = require('express');
// Express ライブラリからサーバーの仕組みを app 変数として呼び出す
const app = express();

// public フォルダ内にあるファイルはパスが一致していると呼びだせます
// /index.html や / の場合は public フォルダ内の index.html が表示されます
app.use(express.static(__dirname + '/public'));

// /api/post/title というパスで POST リクエストでアクセスすると「こんにちは！ようこそ！」というテキストが取得できます
app.post('/api/post/title', (req, res) => {
  console.log('あいさつメッセージ返答！');
  res.send('こんにちは！ようこそ！')
});

// /api/post/title というパスで POST リクエストでアクセスすると「こんにちは！ようこそ！」というテキストが取得できます
app.post('/api/post/add_point', (req, res) => {
  console.log('ポイント加算設定返答！');
  res.send('1')
});

// サーバーを 8080 ポートで起動してログを出力
app.listen(process.env.PORT || 8080, () => {
  console.log("server02 start!");
  console.log(`app listening at http://localhost:${process.env.PORT || 8080}`)
})