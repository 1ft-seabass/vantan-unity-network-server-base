const express = require('express');
const app = express();

app.use(express.static(__dirname + '/public'));

// bodyParser
app.use(express.json())
app.use(express.urlencoded({ extended: true }));

app.get('/api/get/sample', (req, res) => {
  res.json({"result":"GET OK!"})
});

app.post('/api/post/sample', (req, res) => {
  res.json({"result":"POST OK!"})
});

app.listen(process.env.PORT || 8080, () => {
  console.log("server02 start!");
  console.log(`app listening at http://localhost:${process.env.PORT || 8080}`)
})