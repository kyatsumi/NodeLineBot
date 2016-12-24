/*
 * 
 */

/* Heroku環境からAIP.aiアクセストークンを取得 */
const APIAI_CLIENT_ACCESS_TOKEN = process.env.APIAI_CLIENT_ACCESS_TOKEN;

//AIP.ai用のSDK
var apiai = require('apiai');
//セッション管理用uuid生成モジュール
var uuid = require('node-uuid');

/**
 * event.type == 'message'の場合のPromise用のExecuterを生成
 * message.type == 'text'以外の場合はAIを実行しない
 * Excuter実行後のレスポンスとして文字列を返す
 * @param {type} message 
 * @returns {nm$_aiExecuterFactory.module.exports.aiExecuterByMessage.apiaiExecutor|nm$_aiExecuterFactory.module.exports.aiExecuterByMessage.executor} 生成されたExecuterはPromiseで使用してもエラーが発生しない
 */
module.exports.aiExecuterByMessage = function(message) {
    switch(message.type) {
        case 'text':
            var aiInstance = apiai(APIAI_CLIENT_ACCESS_TOKEN);
            var aiRequest = aiInstance.textRequest(message.text, {sessionId: uuid.v1()});
            var apiaiExecutor = function(resolve, reject) {
                aiRequest.on('response', function(response){
                    resolve(response.result.action);
                });
                aiRequest.end();
            };
            return apiaiExecutor;
        default:
            var executor = function(resolve, reject) {
                resolve('empty');
            };
            return executor;
    }
    
};