/* 
 * ラインリプライ用ボディーを取得
 */

var fs = require('fs');

var bodyFactory = function(action, replyToken) {
    var body = JSON.parse(fs.readFileSync('./reply_json/' + action, 'utf8'));
    body['replyToken'] = replyToken;
    return body;
};

module.exports = bodyFactory;
