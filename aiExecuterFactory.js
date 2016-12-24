/*
 * 
 */

/* Heroku環境からAIP.aiアクセストークンを取得 */
const APIAI_CLIENT_ACCESS_TOKEN = process.env.APIAI_CLIENT_ACCESS_TOKEN;

//AIP.ai用のSDK
var apiai = require('apiai');
//セッション管理用uuid生成モジュール
var uuid = require('node-uuid');

module.exports.apiai = function() {
        var aiInstance = apiai(APIAI_CLIENT_ACCESS_TOKEN);
        var aiRequest = aiInstance.textRequest(event.message.text, {sessionId: uuid.v1()});
        var apiaiExecutor = function(resolve, reject) {
            aiRequest.on('response', function(response){
                resolve(response);
            });
            aiRequest.end();
        };
        return apiaiExecutor;
    };