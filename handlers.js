'use strict';

exports.handleIndex = (response, isMobile) => {
	const fs = require('fs');
	const path = require('path');
	const index = path.join(__dirname, 'index.html');
	response.statusCode = 200;
	response.setHeader('Content-Type', 'text/html');
	fs.createReadStream(index).pipe(response);
};

exports.handleBooth = (response, isMobile) => {
	const fs = require('fs');
	const path = require('path');
	const index = path.join(__dirname, 'booth.html');
	response.statusCode = 200;
	response.setHeader('Content-Type', 'text/html');
	fs.createReadStream(index).pipe(response);
};

exports.handleOff = (response) => {
	const exec = require('child_process').exec;
	exec('shutdown /s /t 60 /f');
	response.statusCode = 200;
	response.setHeader('Content-Type', 'text/plain');
	response.end('Shutdown started');
};

exports.handleCancelOff = (response) => {
	const exec = require('child_process').exec;
	exec('shutdown /a');
	response.statusCode = 200;
	response.setHeader('Content-Type', 'text/plain');
	response.end('Shutdown canceled');
};

exports.handleAssets = (response, assets) => {
	const fs = require('fs');
	const path = require('path');
	const favicon = path.join(__dirname, assets);
	response.statusCode = 200;
	response.setHeader('Content-Type', getContentType(assets));
	fs.createReadStream(favicon).pipe(response);
};

exports.handle404 = (response) => {
	response.statusCode = 404;
	response.end();
}

function getContentType(assets) {
	const extention = assets.substring(assets.lastIndexOf('.') + 1);
	switch(extention) {
		case 'icon': return 'image/vnd.microsoft.icon; charset=UTF-8';
		case 'js': return 'application/javascript; charset=UTF-8';
		case 'css': return 'text/css; charset=utf-8';
		default: return '';
	}
}