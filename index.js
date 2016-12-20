/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

var express = require('express');
var app = express();

var port = (process.env.PORT || 3000);
var server = app.listen(port, function() {
   console.log('Node is running on port ' + port);
});

app.get('/', function(req, res, next) {
   res.send('Node is running on port ' + port); 
   res.send('Node is running on port ' + port);
});