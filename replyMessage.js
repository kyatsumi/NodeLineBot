/* 
 * リプライ用クラス
 */

/* Heroku環境からラインアクセストークンを取得 */
const LINE_CHANNEL_ACCESS_TOKEN = process.env.LINE_CHANNEL_ACCESS_TOKEN;
/* ラインのリプライ用URL*/
const LINE_REQUEST_POST = 'https://api.line.me/v2/bot/message/reply';
/* ラインのリクエストヘッダー */
const LINE_REQUEST_HEADERS = {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + LINE_CHANNEL_ACCESS_TOKEN
            };

var request = require('request');

/**
 * ラインへリプライを送信する
 * @param {type} body 送信する内容(json形式）
 * @returns {undefined}
 */
module.exports = function(body) {
            request({
                url: LINE_REQUEST_POST,
                method: 'POST',
                headers: LINE_REQUEST_HEADERS,
                body: body,
                json: true
            });
};
