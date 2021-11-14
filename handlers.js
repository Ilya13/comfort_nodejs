'use strict';

const fs = require('fs');
const path = require('path');
const exec = require('child_process').exec;
const { saveBoothState } = require('./utils');

exports.handleIndex = (response, isMobile) => {
	const index = path.join(__dirname, 'index.html');
	response.statusCode = 200;
	response.setHeader('Content-Type', 'text/html');
	fs.createReadStream(index).pipe(response);
};

exports.handleBooth = (response, isMobile) => {
	const index = path.join(__dirname, 'booth.html');
	response.statusCode = 200;
	response.setHeader('Content-Type', 'text/html');
	fs.createReadStream(index).pipe(response);
};

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

exports.handleGetBoothState = (response) => {
	exports.handleAssets(response, 'assets/booth_state.json');
};

exports.handlePutBoothState = (response, body) => {
	try {
		const state = JSON.parse(body);
		saveBoothState(state);
		response.statusCode = 200;
		response.setHeader('Content-Type', 'text/plain');
		response.end('Shutdown canceled');
	} catch (e) {
		console.log(e);
		response.statusCode = 400;
		response.setHeader('Content-Type', 'text/plain');
		response.end('Unknown State format');
	}
}

exports.handleAssets = (response, assets) => {
	const asset = path.join(__dirname, assets);
	if (fs.existsSync(asset)) {
		console.log(`Load file ${asset}`);
		response.statusCode = 200;
		response.setHeader('Content-Type', getContentType(assets));
		fs.createReadStream(asset).pipe(response);
	} else {
		console.log(`Not found ${asset}`);
		exports.handle404(response);
	}
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