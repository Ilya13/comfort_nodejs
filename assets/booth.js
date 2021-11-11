'use strict';

let boothState = {autoMode: true};
let snackbarContainer;
let floorTemperatureLabel;
let boothTemperatureLabel;
let powerSwitch;
let autoSwitch;
let temperatureInput;
let lastCheckLabel;
let heatOnLabel;
let floorSwitch;
let heaterSwitch;
let autoCard;
let temperatureCard;
let lastCheckCard;
let heatOnCard;
let floorCard;
let heaterCard;

const espHost = 'http://192.168.31.238';

function readState() {
	let xmlHttp = new XMLHttpRequest();
    xmlHttp.onreadystatechange = function() { 
        if (xmlHttp.readyState == 4 && xmlHttp.status == 200) {
			boothState = JSON.parse(xmlHttp.responseText);
			updateState();
		}
    }
    xmlHttp.open('GET', espHost + '/state', true);
    xmlHttp.send(null);
}

function updateState() {
	floorTemperatureLabel.innerText = boothState.temperatureFloor + ' ℃';
	boothTemperatureLabel.innerText = boothState.temperatureAir + ' ℃';
	if (boothState.powerOn) {
		powerSwitch.parentElement.MaterialSwitch.on();
	} else {
		powerSwitch.parentElement.MaterialSwitch.off();
	}
	if (boothState.autoMode) {
		autoSwitch.parentElement.MaterialSwitch.on();
	} else {
		autoSwitch.parentElement.MaterialSwitch.off();
	}
	temperatureInput.value = boothState.controlTemperature;
	lastCheckLabel.innerText = millisToHoursMinutesAndSeconds(boothState.lastCheck);
	heatOnLabel.innerText = millisToHoursMinutesAndSeconds(boothState.heatOnTime);
	if (boothState.relayFloorOn) {
		floorSwitch.parentElement.MaterialSwitch.on();
	} else {
		floorSwitch.parentElement.MaterialSwitch.off();
	}
	if (boothState.relayHeaterOn) {
		heaterSwitch.parentElement.MaterialSwitch.on();
	} else {
		heaterSwitch.parentElement.MaterialSwitch.off();
	}
	updateComponentsVisible();
}

function updateComponentsVisible() {
	if (boothState.powerOn) {
		autoCard.classList.remove('d-none');
		floorCard.classList.remove('d-none');
		heaterCard.classList.remove('d-none');
		heatOnCard.classList.remove('d-none');
		if (boothState.autoMode) {
			temperatureCard.classList.remove('d-none');
			lastCheckCard.classList.remove('d-none');
			floorSwitch.parentElement.MaterialSwitch.disable();
			heaterSwitch.parentElement.MaterialSwitch.disable();
		} else {
			temperatureCard.classList.add('d-none');
			lastCheckCard.classList.add('d-none');
			floorSwitch.parentElement.MaterialSwitch.enable();
			heaterSwitch.parentElement.MaterialSwitch.enable();
		}
	} else {
		autoCard.classList.add('d-none');
		temperatureCard.classList.add('d-none');
		lastCheckCard.classList.add('d-none');
		heatOnCard.classList.add('d-none');
		floorCard.classList.add('d-none');
		heaterCard.classList.add('d-none');
	}
}

function addHandlers() {
	powerSwitch.addEventListener('change', function(event) {
		boothState.powerOn = !boothState.powerOn;
		updateComponentsVisible();
		const xmlHttp = new XMLHttpRequest();
		const request = espHost + (boothState.powerOn ? '/on' : '/off');
		xmlHttp.open('GET', request, true);
		xmlHttp.send(null);
	});
	autoSwitch.addEventListener('change', function(event) {
		boothState.autoMode = !boothState.autoMode;
		updateComponentsVisible();
		const xmlHttp = new XMLHttpRequest();
		xmlHttp.open('GET', espHost + '/mode?v=' + (boothState.autoMode ? '1' : '0'), true);
		xmlHttp.send(null);
	});
	floorSwitch.addEventListener('change', function(event) {
		if (boothState.autoMode) {
			return;
		}
		boothState.relayFloorOn = !boothState.relayFloorOn;
		const xmlHttp = new XMLHttpRequest();
		xmlHttp.open('GET', espHost + '/relay?n=floor&s=' + (boothState.relayFloorOn ? '1' : '0'), true);
		xmlHttp.send(null);
	});
	heaterSwitch.addEventListener('change', function(event) {
		if (boothState.autoMode) {
			return;
		}
		boothState.relayHeaterOn = !boothState.relayHeaterOn;
		const xmlHttp = new XMLHttpRequest();
		xmlHttp.open('GET', espHost + '/relay?n=heater&s=' + (boothState.relayHeaterOn ? '1' : '0'), true);
		xmlHttp.send(null);
	});
	temperatureInput.addEventListener('change', function(event) {
		if (!boothState.autoMode) {
			return;
		}
		if (isNaN(temperatureInput.value) || +temperatureInput.value < 16 || +temperatureInput.value > 24) {
			temperatureInput.parentElement.classList.add('is-invalid');
			return;
		}
		temperatureInput.parentElement.classList.remove('is-invalid');
		boothState.controlTemperature = +temperatureInput.value;
		const xmlHttp = new XMLHttpRequest();
		xmlHttp.open('GET', espHost + '/temperature?v=' + boothState.controlTemperature, true);
		xmlHttp.send(null);
	});
}

function millisToHoursMinutesAndSeconds(millis) {
  let seconds = Math.floor((millis / 1000) % 60);
  let minutes = Math.floor((millis / (1000 * 60)) % 60);
  let hours = Math.floor((millis / (1000 * 60 * 60)) % 24);

  hours = (hours < 10) ? '0' + hours : hours;
  minutes = (minutes < 10) ? '0' + minutes : minutes;
  seconds = (seconds < 10) ? '0' + seconds : seconds;

  return hours + ":" + minutes + ":" + seconds;
}

document.addEventListener('DOMContentLoaded', function() {
	snackbarContainer = document.querySelector('#toast');
	boothTemperatureLabel = document.getElementById('booth-temperature-label');
	floorTemperatureLabel = document.getElementById('floor-temperature-label');
	powerSwitch = document.getElementById('power-switch');
	autoSwitch = document.getElementById('auto-switch');
	temperatureInput = document.getElementById('temperature-input');
	lastCheckLabel = document.getElementById('last-check-label');
	heatOnLabel = document.getElementById('heat-on-label');
	floorSwitch = document.getElementById('floor-switch');
	heaterSwitch = document.getElementById('heater-switch');
	autoCard = document.getElementById('auto-card');
	temperatureCard = document.getElementById('temperature-card');
	lastCheckCard = document.getElementById('last-check-card');
	heatOnCard = document.getElementById('heat-on-card');
	floorCard = document.getElementById('floor-card');
	heaterCard = document.getElementById('heater-card');
	
	addHandlers();
	setTimeout(readState, 500);
});