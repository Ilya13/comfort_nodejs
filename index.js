'use strict';

const http = require('http');
const { handleIndex, handleBooth, handleOff, handleCancelOff, handleGetBoothState, handlePutBoothState, handleAssets, handle404 } = require('./handlers');

const hostname = '192.168.31.52';
const port = 80;

const server = http.createServer((request, response) => {
	if (request.method == 'GET') {
		if (request.url === '/') {
			const isMobile = /mobile/i.test(request.headers['user-agent']);
			handleIndex(response, isMobile);
			return;
		}
		if (request.url === '/booth') {
			const isMobile = /mobile/i.test(request.headers['user-agent']);
			handleBooth(response, isMobile);
			return;
		}
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
		if (request.url.startsWith('/assets') || request.url.startsWith('/node_modules')) {
			handleAssets(response, request.url);
			return;
		}
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

server.listen(port, hostname, () => {
	console.log(`Server running at http://${hostname}:${port}/`);
});