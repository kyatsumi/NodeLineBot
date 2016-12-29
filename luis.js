/* 
 */

var request = require('request');

var luisUrl = 'https://api.projectoxford.ai/luis/v2.0/apps/04873a90-bfb6-4e20-9fe7-1cf73c7cf919?subscription-key=080de2aa58ea4010a090de37b8e2784d&q=';

module.exports = function(text) {
    request(luisUrl + text, function (error, response, body) {
        if (!error && response.statusCode == 200) {
          console.log(JSON.parse(body));
        } else {
          console.log('error: '+ response.statusCode);
        }
    });
};
