
/* 環境からAIP.aiアクセストークンを取得 */
const APIAI_CLIENT_ACCESS_TOKEN = process.env.APIAI_CLIENT_ACCESS_TOKEN;

//AIP.ai用のSDK
var apiai = require('apiai');
//セッション管理用uuid生成モジュール
var uuid = require('node-uuid');

/**
 * Promise用のExecuterを生成
 * Excuter実行後のレスポンスとしてAIに登録してある文字列を返す
 * "お店に行きたい"と同じ意味の言葉はshopLocationという単語に変換されるように登録してある。
 * 例：お店に行きたい　→　shopLocation
 * 　　お店の地図　　　→　shopLocation
 * 　　みせの場所　　　→　shopLocation
 *     メニュー       →  undefined
 * @param {type} message 
 * @returns {nm$_executer-factory.module.exports.executerByMessage.apiaiExecutor|
 * nm$_executer-factory.module.exports.executerByMessage.executor} 
 * AIが識別した文字列を返す,AIを使用しなかった場合はemptyを返す
 */
module.exports.executerByMessage = function(message) {
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