/* 
 * ラインリプライ用ボディーを取得
 */

var fs = require('fs');

module.exports.getBody = function(type, action, replyToken) {
    switch(type) {
        case 'message':
            return messageBody(action, replyToken);
        case 'postback':
            return postBackBody(action, replyToken);
        default:
            return messageBody('empty', replyToken);
        };
};

var messageBody = function(action, replyToken) {
    var body = JSON.parse(fs.readFileSync('./reply_json/' + action + '.json', 'utf8'));
    body['replyToken'] = replyToken;
    return body;
};

var postBackBody = function(action,replyToken) {
    var body = JSON.parse(fs.readFileSync('./reply_json/postback/' + action + '.json', 'utf8'));
    body['replyToken'] = replyToken;
    return body;
};
