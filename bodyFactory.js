/* 
 * このファイル内にある関数の戻り値は必ずLineMessageAPIのbodyの仕様にそった内容を返すこと
 */

var fs = require('fs');

/**
 * {@code action}をファイル名としてreply_jsonフォルダ内部を検索する
 * @param {type} type 
 * @param {type} action 
 * @param {type} replyToken 
 * @returns {Array|Object|messageBody.body|nm$_bodyFactory.messageBody.body|postBackBody.body|nm$_bodyFactory.postBackBody.body} 
 */
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
    var body = JSON.parse(fs.readFileSync('./reply_json/message/' + action + '.json', 'utf8'));
    body['replyToken'] = replyToken;
    return body;
};

var postBackBody = function(action,replyToken) {
    var body = JSON.parse(fs.readFileSync('./reply_json/postback/' + action + '.json', 'utf8'));
    body['replyToken'] = replyToken;
    return body;
};
