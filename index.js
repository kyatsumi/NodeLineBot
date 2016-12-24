/* 
 * Line Message APIのWebhookを受け取る
 */

//モジュールのインポート
var express = require('express');
var bodyParser = require('body-parser');
var Promise = require('bluebird');
var signatureValidation = require('./signatureValidation');
var replyMessage = require('./replyMessage');
var bodyFactory = require('./bodyFactory');
var aiExecuterFactory = require('./aiExecuterFactory');
var app = express();

//ミドルウェア設定
app.use(bodyParser.json());
Promise.config({
    cancellation: true
});

//Webサーバー設定
var port = (process.env.PORT || 3000);
var server = app.listen(port, function() {
   console.log('Node is running on port ' + port);
});

//ルーターの設定
app.get('/', function(req, res, next) {
   res.status(200).end();
});

app.post('/callback', function(req, res, next) {
    res.status(200).end();
    if (!signatureValidation(req.headers['x-line-signature'], req.body)) {
        console.log('シグネチャの検証結果:NG');
        return;
    } 
    for (var event of req.body.events) {
        switch(event.type) {
            case 'message' :
                var analysisResult = new Promise(aiExecuterFactory.aiExecuterByMessage(event.message));
                analysisResult.then(function(aiResponse) {
                    console.log(aiResponse);
                    var body = bodyFactory.getBody(event.type, aiResponse, event.replyToken);
                    replyMessage(body);
                });
                break;
            default:
                //message以外は未実装
                break;
        }
    }
});
