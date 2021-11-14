'use strict';

const http = require('http');
const { handleOff, handleCancelOff, handleGetBoothState, handlePutBoothState, handleAssets, handleNodeModules, handleFile, handle404 } = require('./backend/handlers');

const args = require('minimist')(process.argv.slice(2));
const port = args['port'] ?? 80;

const server = http.createServer((request, response) => {
	if (request.method == 'GET') {
		if (request.url === '/off') {
			handleOff(response);
			return;
		}
		if (request.url === '/off/cancel') {
			handleCancelOff(response);
			return;
		}
		if (request.url === '/booth/state') {
			handleGetBoothState(response);
			return;
		}
		if (request.url.startsWith('/assets')) {
			handleAssets(response, request.url);
			return;
		}
		if (request.url.startsWith('/node_modules')) {
			handleNodeModules(response, request.url);
			return;
		}
		if (request.url.endsWith('.js') || request.url.endsWith('.json')) {
			handleFile(response, `../frontend${request.url}`);
			return;
		}
		handleFile(response, '../frontend/index.html');
		return;
	}
	if (request.method == 'PUT') {
		if (request.url === '/booth/state') {
			let state = ''
			request.on('data', (data) => {
				state += data;
			})
			request.on('end', () => {
				handlePutBoothState(response, state);
			})
			return;
		}
	}
	handle404(response);
});

server.listen(port, undefined, () => {
	console.log(`Server running at http://:${port}/`);
});