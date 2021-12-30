'use strict';

const fs = require('fs');
const path = require('path');
const exec = require('child_process').exec;
const { saveHouseState, saveBoothState } = require('./utils');

exports.handleOff = (response) => {
	exec('shutdown /s /t 60 /f');
	response.statusCode = 200;
	response.setHeader('Content-Type', 'text/plain');
	response.end('Shutdown started');
};

exports.handleCancelOff = (response) => {
	exec('shutdown /a');
	response.statusCode = 200;
	response.setHeader('Content-Type', 'text/plain');
	response.end('Shutdown canceled');
};


exports.handleGetHouseState = (response) => {
	exports.handleFile(response, 'state/house.json');
};

exports.handlePutHouseState = (response, body) => {
	try {
		const state = JSON.parse(body);
		saveHouseState(state);
		response.statusCode = 200;
		response.setHeader('Content-Type', 'text/plain');
		response.end('House state saved');
	} catch (e) {
		console.log(e);
		response.statusCode = 500;
		response.setHeader('Content-Type', 'text/plain');
		response.end('House state didn\'t save');
	}
}

exports.handleGetBoothState = (response) => {
	exports.handleFile(response, 'state/booth.json');
};

exports.handlePutBoothState = (response, body) => {
	try {
		const state = JSON.parse(body);
		saveBoothState(state);
		response.statusCode = 200;
		response.setHeader('Content-Type', 'text/plain');
		response.end('Booth state saved');
	} catch (e) {
		console.log(e);
		response.statusCode = 500;
		response.setHeader('Content-Type', 'text/plain');
		response.end('Booth state didn\'t save');
	}
}

exports.handleAssets = (response, assets) => {
	exports.handleFile(response, `../frontend${assets}`);
}

exports.handleNodeModules = (response, nodeModules) => {
	exports.handleFile(response, `..${nodeModules}`);
}

exports.handleFile = (response, file) => {
	if (file.endsWith('?')) {
		file = file.slice(0, -1);
	}
	const asset = path.join(__dirname, file);
	if (fs.existsSync(asset)) {
		response.statusCode = 200;
		response.setHeader('Content-Type', getContentType(file));
		fs.createReadStream(asset).pipe(response);
	} else {
		console.log(`404: ${asset}`);
		exports.handle404(response);
	}
}

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
		case 'svg': return 'image/svg+xml; charset=utf-8';
		default: return '';
	}
}