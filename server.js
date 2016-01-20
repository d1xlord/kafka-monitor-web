var express = require('express');
var app = express();
var path = require('path');
var port = 8080;

app.use(express.static(__dirname));

// configure our app to handle CORS requests
// app.use(function(req, res, next) {
// 	res.setHeader('Access-Control-Allow-Origin', '*');
// 	res.setHeader('Access-Control-Allow-Methods', 'GET, POST');
// 	res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type, \
// 		Authorization');
// 	next();
// });

app.get('*', function (req, res) {
	res.sendFile(path.join(__dirname + '/index.html'));
});

app.listen(port);
console.log('listening at port ' + port);