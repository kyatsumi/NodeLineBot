/* 
 * Line Message APIのWebhookを受ける
 */

const LINE_CHANNEL_ACCESS_TOKEN = process.env.LINE_CHANNEL_ACCESS_TOKEN;
const LINE_REQUEST_POST = 'https://api.line.me/v2/bot/message/reply';
const LINE_REQUEST_HEADERS = {
                'Content-Type' : 'application/json',
                'Authorization' : 'Bearer ' + LINE_CHANNEL_ACCESS_TOKEN
            };

//モジュールのインポート
var express = require('express');
var bodyParser = require('body-parser');
var request = require('request');
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
   res.send(LINE_CHANNEL_ACCESS_TOKEN);
});

//POST
app.post('/callback', function(req, res, next) {
    res.status(200).end();
    for (var event of req.body.events) {
        if (event.type == 'message') {
            var body = {
                replyToken : event.replyToken,
                message: [{
                    type: 'text',
                    text: event.message.text + 'ですね'
                }]
            };
            request({
                url: LINE_REQUEST_POST,
                method: 'POST',
                headers: LINE_REQUEST_HEADERS,
                body: body,
                json: true
            });
        }
    }
});

