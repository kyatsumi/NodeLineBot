/* 
 * Line Message APIのWebhookを受ける
 */



/* Heroku環境からAIP.aiアクセストークンを取得 */
const APIAI_CLIENT_ACCESS_TOKEN = process.env.APIAI_CLIENT_ACCESS_TOKEN;


//モジュールのインポート
var express = require('express');
var bodyParser = require('body-parser');
var apiai = require('apiai');
var uuid = require('node-uuid');
var Promise = require('bluebird');
var signatureValidation = require('./signatureValidation');
var reply = require('./reply');
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
//GET
app.get('/', function(req, res, next) {
   res.send('Node is running on port ' + port);
});

//POST
app.post('/callback', function(req, res, next) {
    res.status(200).end();
    if (!signatureValidation(req.headers['x-line-signature'], req.body)) {
        console.log('シグネチャの検証結果:NG');
        return;
    } 
    for (var event of req.body.events) {
        if (event.type == 'message' && event.message.text) {
            var aiInstance = apiai(APIAI_CLIENT_ACCESS_TOKEN);
            var aiRequest = aiInstance.textRequest(event.message.text, {sessionId: uuid.v1()});
            var gotIntent = new Promise(function(resolve, reject){
                aiRequest.on('response', function(response){
                    resolve(response);
                });
                aiRequest.end();
            });
            gotIntent.then(function(response) {
                console.log(response.result.action);
                switch (response.result.action) {
                        case 'shopLocation':
                            var body = {
                                replyToken : event.replyToken,
                                messages: [{
                                    type: 'location',
                                    title: '架空のお店です',
                                    address: '名古屋駅のそのへん',
                                    latitude: '35.170983',
                                    longitude: '136.882874'
                                }]
                            };
                            reply.replyTextMessage(body);
                            break;
                        default:
                            var body = {
                                replyToken : event.replyToken,
                                messages: [{
                                    type: 'text',
                                    text: event.message.text
                                }]
                            };
                            reply.replyTextMessage(body);
                            break;
}
            });

        }
    }
});

