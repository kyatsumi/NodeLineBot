/* 
 * Line Message APIのWebhookを受ける
 */


//モジュールのインポート
var express = require('express');
var bodyParser = require('body-parser');
var Promise = require('bluebird');
var signatureValidation = require('./signatureValidation');
var reply = require('./reply');
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
   res.send('Node is running on port ' + port);
});

app.post('/callback', function(req, res, next) {
    res.status(200).end();
    if (!signatureValidation(req.headers['x-line-signature'], req.body)) {
        console.log('シグネチャの検証結果:NG');
        return;
    } 
    for (var event of req.body.events) {
        if (event.type == 'message' && event.message.text) {
            var analysisResult = new Promise(aiExecuterFactory.apiai(event.message.text));
            analysisResult.then(function(aiResponse) {
                console.log(aiResponse.result.action);
                var body = bodyFactory.apiaiBody(aiResponse.result.action, event.replyToken);
                reply.replyMessage(body);
            });
        }
    }
});

