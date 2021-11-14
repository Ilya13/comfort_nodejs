'use strict';

let homeState;
let snackbarContainer;
let dimmers;
const espHost = 'http://192.168.31.213';

function readDimmerStates() {
	let xmlHttp = new XMLHttpRequest();
    xmlHttp.onreadystatechange = function() { 
        if (xmlHttp.readyState == 4 && xmlHttp.status == 200) {
			homeState = JSON.parse(xmlHttp.responseText);
			updateState();
		}
    }
    xmlHttp.open('GET', espHost + '/state', true);
    xmlHttp.send(null);
}

function updateState() {
	let i;
	for (i = 0; i < dimmers.length; i++) {
		if (homeState.dimmers[i].state === 1) {
			dimmers[i].MaterialSwitch.on();
		} else {
			dimmers[i].MaterialSwitch.off();
		}
	}
}

function addPcHandlers() {
	document.getElementById('pc-off').addEventListener('click', function() {
		let xmlHttp = new XMLHttpRequest();
		xmlHttp.onreadystatechange = function() { 
			if (xmlHttp.readyState == 4 && xmlHttp.status == 200) {
				snackbarContainer.MaterialSnackbar.showSnackbar({message: 'Выключение запущено'});
			}
		}
		xmlHttp.open('GET', '/off', true);
		xmlHttp.send(null);
	});
	document.getElementById('pc-off-cancel').addEventListener('click', function() {
		let xmlHttp = new XMLHttpRequest();
		xmlHttp.onreadystatechange = function() { 
			if (xmlHttp.readyState == 4 && xmlHttp.status == 200) {
				snackbarContainer.MaterialSnackbar.showSnackbar({message: 'Выключение отменено'});
			}
		}
		xmlHttp.open('GET', '/off/cancel', true);
		xmlHttp.send(null);
	});
}

function addDimmerHandlers() {
	let i;
	for (i = 0; i < dimmers.length; i++) {
		dimmers[i].children[0].addEventListener('change', function(event) {
			const index = event.currentTarget.id.split('-')[1];
			homeState.dimmers[index - 1].state = homeState.dimmers[index - 1].state === 1 ? 0 : 1;
			const xmlHttp = new XMLHttpRequest();
			xmlHttp.open('GET', espHost + '/dimmer?i=' + index + '&s=' + homeState.dimmers[index - 1].state, true);
			xmlHttp.send(null);
		});
	}
}

document.addEventListener('DOMContentLoaded', function() {
	snackbarContainer = document.querySelector('#toast');
	dimmers = document.getElementsByClassName('mdl-switch');
	addPcHandlers();
	addDimmerHandlers();
	setTimeout(readDimmerStates, 500);
});