/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

//モジュールのインポート
var express = require('express');
var app = express();

//Webサーバー設定
var port = (process.env.PORT || 3000);
var server = app.listen(port, function() {
   console.log('Node is running on port ' + port);
});

//ルーターの設定
//GET
app.get('/', function(req, res, next) {
   res.send('Node is running on port ' + port);
});

//POST
app.post('/callback', function(req, res, next) {
    res.status(200).end();
    console.log(req.body);
});