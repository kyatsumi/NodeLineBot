/* 環境から秘密鍵を取得 */
const LINE_CHANNEL_SECRET = process.env.LINE_CHANNEL_SECRET;

var crypto = require('crypto');

/*
 * リクエストヘッダーの署名検証を行う
 * @param {type} signature ヘッダーの'x-line-signature'
 * @param {type} body 送られてきたbody
 * @returns {Boolean}署名が正しい場合はtrue
 */
module.exports = function(signature, body) {
    return signature == crypto.createHmac('sha256', LINE_CHANNEL_SECRET).update(new Buffer(JSON.stringify(body), 'utf8')).digest('base64');
};
