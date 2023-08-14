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

// Airtable 設定 ///////////////////////////////////////////////////////////////

// Airtable API キー
const AIRTABLE_API_KEY = 'AIRTABLE_API_KEY';

// Airtable BASE ID
const AIRTABLE_BASE_ID = 'AIRTABLE_BASE_ID';

var Airtable = require('airtable');
var base = new Airtable({apiKey: AIRTABLE_API_KEY}).base(AIRTABLE_BASE_ID);

// Express サーバー設定

app.get('/api/get/airtable', async (req, res) => {
    console.log('/api/get/airtable 受信');
    // 受信したデータ
    // console.log(req.body);

    let records;
    // try / catch も加える
    try {
        // select + all で全件取得
        records = await base('Table 1').select({
            view: "Grid view"
        }).all();
    } catch (error){
        console.log(error);
        return;
    };

    let responseData = {"data":[]};
    
    // 結果表示
    records.forEach(function(record){
        console.log('Retrieved', record.get('Data'));
        responseData.data.push(record.get('Data'));
    });
    
    // res.json はオブジェクトを JSON 形式で返答します
    res.json(responseData)
});

// サーバーを 8080 ポートで起動してログを出力
app.listen(process.env.PORT || 8080, () => {
    console.log(`${path.basename(__filename)} start!`);
    console.log(`app listening at http://localhost:${process.env.PORT || 8080}`)
})