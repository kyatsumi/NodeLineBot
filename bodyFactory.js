/* 
 * ラインリプライ用ボディーを取得
 */

var fs = require('fs');

module.exports.apiaiBody = function(action, replyToken) {
    var body = JSON.parse(fs.readFileSync('./reply_json/' + action + '.json', 'utf8'));
    body['replyToken'] = replyToken;
    return body;
};

module.exports.apiaiPostBackBody = function(action,replyToken) {
    var body = JSON.parse(fs.readFileSync('./reply_json/postback/' + action + '.json', 'utf8'));
    body['replyToken'] = replyToken;
    return body;
};
