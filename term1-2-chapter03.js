const express = require('express');
const app = express();

app.use(express.static(__dirname + '/public'));

app.get('/api/get/json', (req, res) => {
  // 送るデータを JavaScript のオブジェクトで作る
  const responseData = {
    "name":"Box1",
    "name2":"Box2"
  };
  // res.json はオブジェクトを JSON 形式で返答します
  // 以前のテキスト返答は res.send(文字列) を使っていました
  res.json(responseData)
});

app.listen(process.env.PORT || 8080, () => {
  console.log("term1-2-chapter03 start!");
  console.log(`app listening at http://localhost:${process.env.PORT || 8080}`)
})