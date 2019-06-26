const colors = require('colors/safe');
const fs = require('fs');
const http = require('http');

const server = http.createServer();

server.on('request', function (req, res) {
	console.log(
		colors.blue('Request from: ')+colors.green('%s:%s ')+colors.white('%s %s'),
		req.connection.remoteAddress, req.connection.remotePort,
		req.method, req.url
	);

    if (req.method === 'GET' && req.url === '/') {
		fs.readFile('./index.html', 'utf-8', function(err, data) {
			if(err) throw err;
			res.setHeader("Content-Type", "text/html; charset=utf-8");
			res.write(data);
	        res.end();
		});
    } else {
		fs.readFile('./images/404-error.jpg', function(err, data) {
			if(err) throw err;
			res.setHeader("Content-Type", "image/jpeg");
	        res.statusCode = 404;
	        res.write(data);
	        res.end();
		});
    }
});

server.listen(8080);
