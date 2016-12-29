/* 
 */

var request = require('request');

var luisUrl = 'https://api.projectoxford.ai/luis/v2.0/apps/04873a90-bfb6-4e20-9fe7-1cf73c7cf919?subscription-key=080de2aa58ea4010a090de37b8e2784d&q=%E3%81%8A%E5%BA%97%E3%81%AE%E5%A0%B4%E6%89%80';

module.exports = function(text) {
    request(luisUrl, function (error, response, body) {
        if (!error && response.statusCode == 200) {
          json = JSON.parse(body);
          console.log(json);
          return json.topScoringIntent.intent;
        } else {
          console.log('error: '+ response.statusCode);
          return 'undefined';
        }
    });
};
