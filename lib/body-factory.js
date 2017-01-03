/* 
 * このファイル内にある関数の戻り値は
 * 必ずLineMessageAPIのbodyの仕様にそった内容を返すこと
 */

var fs = require('fs');

/**
 * {@code action}をファイル名としてreply_jsonフォルダ内部を検索する
 * @param {type} type メッセージの種類
 * @param {type} action ファイル名
 * @param {type} replyToken 読み込んだjsonのreplyTokenに代入する値
 * @returns {Array|Object|messageBody.body|nm$_bodyFactory.messageBody.body|
 * postBackBody.body|nm$_bodyFactory.postBackBody.body} 
 */
module.exports.getBody = function(eventType, action, replyToken) {
    switch(eventType) {
        case 'message':
            return messageBody(action, replyToken);
        case 'postback':
            return postBackBody(action, replyToken);
        default:
            return messageBody('empty', replyToken);
    };
};

var messageBody = function(action, replyToken) {
    var body = JSON.parse(fs.readFileSync
        ('reply-json/message/' + action + '.json', 'utf8'));
    body['replyToken'] = replyToken;
    return body;
};

var postBackBody = function(action,replyToken) {
    var body = JSON.parse(fs.readFileSync
        ('../reply-json/postback/' + action + '.json', 'utf8'));
    body['replyToken'] = replyToken;
    return body;
};
