const express = require('express');
const app = express();

app.use(express.static(__dirname + '/public'));

app.post('/api/post/json', (req, res) => {

  // 送るデータを JavaScript のオブジェクトで作る
  const responseData = {
    "welcome":"こんにちは！ようこそ！",
    "add_point":1,
  };
  // res.json はオブジェクトをJSON 形式で返答する
  // 以前のテキスト返答は res.send(文字列) を使っていました
  res.json(responseData)
});

app.listen(process.env.PORT || 8080, () => {
  console.log("server05 start!");
  console.log(`app listening at http://localhost:${process.env.PORT || 8080}`)
})