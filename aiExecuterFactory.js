/*
 * 
 */

/* Heroku環境からAIP.aiアクセストークンを取得 */
const APIAI_CLIENT_ACCESS_TOKEN = process.env.APIAI_CLIENT_ACCESS_TOKEN;

//AIP.ai用のSDK
var apiai = require('apiai');
//セッション管理用uuid生成モジュール
var uuid = require('node-uuid');

//event.type == 'message'の場合のPromise用のExecuterを生成
module.exports.aiExecuterByMessage = function(message) {
    switch(message.type) {
        case 'text' :
            var aiInstance = apiai(APIAI_CLIENT_ACCESS_TOKEN);
            var aiRequest = aiInstance.textRequest(message.text, {sessionId: uuid.v1()});
            var apiaiExecutor = function(resolve, reject) {
                aiRequest.on('response', function(response){
                    resolve(response.result.action);
                });
                aiRequest.end();
            };
            return apiaiExecutor;
        default :
            var executor = function(resolve, reject) {
                resolve('');
            };
            return executor;
    }
    
};