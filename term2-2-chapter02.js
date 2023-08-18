// path ライブラリ
const path = require('path');

// Airtable 設定 /////////////////////////////////////////////////////

// Airtable ライブラリ
const Airtable = require('airtable');

// Airtable API キー
const AIRTABLE_API_KEY = 'AIRTABLE_API_KEY';
// Airtable BASE ID
const AIRTABLE_BASE_ID = 'AIRTABLE_BASE_ID';

// 今回 Base を読み込む設定
const base = new Airtable({ apiKey: AIRTABLE_API_KEY }).base(AIRTABLE_BASE_ID);

// サーバー設定 ///////////////////////////////////////////////////////

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

// /api/post/result というパスで POST リクエストでアクセスするとデータが取得できます
app.post('/api/post/result', async (req, res) => {
  console.log('/api/post/result 受信');
  // 受信したデータを表示
  console.log(req.body);

  // Airtable にデータを保存
  const currentName = req.body.name;
  const currentData = req.body.point;

  let result;
  try {
    const fields = [
      {
        "fields": {
          "Name":currentName,
          "Point": currentData
        }
      }
    ];

    result = await base('PointList').create(fields);
  } catch (e) {
    console.log(e);
  }
  
  // res.json はオブジェクトを JSON 形式で返答します
  let responseData = { "result": "OK" };
  res.json(responseData)
});

// サーバーを 8080 ポートで起動してログを出力
app.listen(process.env.PORT || 8080, () => {
  console.log(`${path.basename(__filename)} start!`);
  console.log(`app listening at http://localhost:${process.env.PORT || 8080}`)
})