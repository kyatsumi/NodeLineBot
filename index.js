/* 
 * Line Message APIのWebhookを受ける
 */

//モジュールのインポート
var express = require('express');
var bodyParser = require('body-parser');
var app = express();

//ミドルウェア設定
app.use(bodyParser.json());

//Webサーバー設定
var port = (process.env.PORT || 3000);
var server = app.listen(port, function() {
   console.log('Node is running on port ' + port);
});

//ルーターの設定
//GET
app.get('/', function(req, res, next) {
   res.send('Node is running on port ' + port);
});

//POST
app.post('/callback', function(req, res, next) {
    res.status(200).end();
    for (var event of req.body.events) {
        if (event.type == 'message') {
            console.log(event.type + ' ' + event.message);
        }
    }
});

