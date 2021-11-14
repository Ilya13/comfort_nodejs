import { BaseComponent } from './base.component.js';

export class BoothComponent extends BaseComponent {
	boothState = {
		temperatureFloor: null,
		temperatureAir: null,
		powerOn: false,
		autoMode: false,
		controlTemperature: null,
		relayFloorOn: false,
		relayHeaterOn: false,
		lastCheck: null,
		heatOnTime: null,
	};
	floorTemperatureLabel;
	boothTemperatureLabel;
	powerSwitch;
	autoSwitch;
	temperatureInput;
	lastCheckLabel;
	heatOnLabel;
	floorSwitch;
	heaterSwitch;
	autoCard;
	temperatureCard;
	lastCheckCard;
	heatOnCard;
	floorCard;
	heaterCard;

	getTemplate() {
		return `
		<div class="booth-container">
			<div class="temperature-container">
				<div class="mdl-card mdl-shadow--4dp portfolio-card" style="background-color: #FFDE03">
					<div class="mdl-card__title">
						<h3 id="booth-temperature-label">&#8451;</h3>
						<div class="mdl-layout-spacer"></div>
						<img src="/assets/icons/booth.svg" alt="Booth" width="36" height="36"/>
					</div>
				</div>
				<div class="mdl-card mdl-shadow--4dp portfolio-card" style="background-color: #FF0266">
					<div class="mdl-card__title">
						<h3 id="floor-temperature-label">&#8451;</h3>
						<div class="mdl-layout-spacer"></div>
						<img src="/assets/icons/floor.svg" alt="Floor" width="36" height="36"/>
					</div>
				</div>
			</div>
			<div class="mdl-card mdl-shadow--4dp portfolio-card" style="background-color: #4CAF50">
				<div class="mdl-card__title">
					<h2 class="mdl-card__title-text">Включён</h2>
					<div class="mdl-layout-spacer"></div>
					<img src="/assets/icons/power.svg" alt="Power" width="36" height="36"/>
				</div>
				<div class="mdl-card__actions mdl-card--border">
					<div>
						<label class="mdl-switch mdl-js-switch mdl-js-ripple-effect" for="power-switch">
							<input type="checkbox" id="power-switch" class="mdl-switch__input">
							<span class="mdl-switch__label"></span>
						</label>
					</div>
				</div>
			</div>
			<div id="auto-card" class="mdl-card mdl-shadow--4dp portfolio-card d-none" style="background-color: #009688">
				<div class="mdl-card__title">
					<h2 class="mdl-card__title-text">Автоматический режим</h2>
					<div class="mdl-layout-spacer"></div>
					<img src="/assets/icons/tech.svg" alt="Tech" width="36" height="36"/>
				</div>
				<div class="mdl-card__actions mdl-card--border">
					<div>
						<label class="mdl-switch mdl-js-switch mdl-js-ripple-effect" for="auto-switch">
							<input type="checkbox" id="auto-switch" class="mdl-switch__input">
							<span class="mdl-switch__label"></span>
						</label>
					</div>
				</div>
			</div>
			<div id="temperature-card" class="mdl-card mdl-shadow--4dp portfolio-card d-none" style="background-color: #9E9E9E">
				<div class="mdl-card__title">
					<h2 class="mdl-card__title-text">Температура</h2>
					<div class="mdl-layout-spacer"></div>
					<div class="mdl-textfield mdl-js-textfield">
						<input class="mdl-textfield__input" type="text" pattern="[0-9]*" id="temperature-input">
						<label class="mdl-textfield__label" for="temperature-input"></label>
					</div>
				</div>
			</div>
			<div id="last-check-card" class="mdl-card mdl-shadow--4dp portfolio-card d-none" style="background-color: #9E9E9E">
				<div class="mdl-card__title">
					<h2 class="mdl-card__title-text">Время до последней проверки</h2>
					<div class="mdl-layout-spacer"></div>
					<h2 class="mdl-card__title-text" id="last-check-label">4 мин</h2>
				</div>
			</div>
			<div id="heat-on-card" class="mdl-card mdl-shadow--4dp portfolio-card d-none" style="background-color: #9E9E9E">
				<div class="mdl-card__title">
					<h2 class="mdl-card__title-text">Время обогрева</h2>
					<div class="mdl-layout-spacer"></div>
					<h2 class="mdl-card__title-text" id="heat-on-label">4 мин</h2>
				</div>
			</div>
			<div id="floor-card" class="mdl-card mdl-shadow--4dp portfolio-card d-none" style="background-color: #009688">
				<div class="mdl-card__title">
					<h2 class="mdl-card__title-text">Теплый пол</h2>
					<div class="mdl-layout-spacer"></div>
					<img src="/assets/icons/heater.svg" alt="Heater" width="36" height="36"/>
				</div>
				<div class="mdl-card__actions mdl-card--border">
					<div>
						<label class="mdl-switch mdl-js-switch mdl-js-ripple-effect" for="floor-switch">
							<input type="checkbox" id="floor-switch" class="mdl-switch__input">
							<span class="mdl-switch__label"></span>
						</label>
					</div>
				</div>
			</div>
			<div id="heater-card" class="mdl-card mdl-shadow--4dp portfolio-card d-none" style="background-color: #009688">
				<div class="mdl-card__title">
					<h2 class="mdl-card__title-text">Обогреватель</h2>
					<div class="mdl-layout-spacer"></div>
					<img src="/assets/icons/converter.svg" alt="Converter" width="36" height="36"/>
				</div>
				<div class="mdl-card__actions mdl-card--border">
					<div>
						<label class="mdl-switch mdl-js-switch mdl-js-ripple-effect" for="heater-switch">
							<input type="checkbox" id="heater-switch" class="mdl-switch__input">
							<span class="mdl-switch__label"></span>
						</label>
					</div>
				</div>
			</div>
		</div>
		
		`;
	}

	onInit() {
		this._initComponents();
		this._addListeners();
		this._readState();
	}

	_initComponents() {
		this.boothTemperatureLabel = document.getElementById('booth-temperature-label');
		this.floorTemperatureLabel = document.getElementById('floor-temperature-label');
		this.powerSwitch = document.getElementById('power-switch');
		this.autoSwitch = document.getElementById('auto-switch');
		this.temperatureInput = document.getElementById('temperature-input');
		this.lastCheckLabel = document.getElementById('last-check-label');
		this.heatOnLabel = document.getElementById('heat-on-label');
		this.floorSwitch = document.getElementById('floor-switch');
		this.heaterSwitch = document.getElementById('heater-switch');
		this.autoCard = document.getElementById('auto-card');
		this.temperatureCard = document.getElementById('temperature-card');
		this.lastCheckCard = document.getElementById('last-check-card');
		this.heatOnCard = document.getElementById('heat-on-card');
		this.floorCard = document.getElementById('floor-card');
		this.heaterCard = document.getElementById('heater-card');
	}

	_addListeners() {
		this.addEventListener(this.powerSwitch, 'change', () => {
			this.boothState.powerOn = !this.boothState.powerOn;
			this._updateComponentsVisible();
			this._writeState();
		});
		this.addEventListener(this.autoSwitch, 'change', () => {
			this.boothState.autoMode = !this.boothState.autoMode;
			this.boothState.relayFloorOn = false;
			this.boothState.relayHeaterOn = false;
			this.floorSwitch.parentElement.MaterialSwitch.off();
			this.heaterSwitch.parentElement.MaterialSwitch.off();
			this._updateComponentsVisible();
			this._writeState();
		});
		this.addEventListener(this.floorSwitch, 'change', () => {
			if (this.boothState.autoMode) {
				return;
			}
			this.boothState.relayFloorOn = !this.boothState.relayFloorOn;
			this._writeState();
		});
		this.addEventListener(this.heaterSwitch, 'change', () => {
			if (this.boothState.autoMode) {
				return;
			}
			this.boothState.relayHeaterOn = !this.boothState.relayHeaterOn;
			this._writeState();
		});
		this.addEventListener(this.temperatureInput, 'change', () => {
			if (!this.boothState.autoMode) {
				return;
			}
			if (isNaN(this.temperatureInput.value) || +this.temperatureInput.value < 16 || +this.temperatureInput.value > 24) {
				this.temperatureInput.parentElement.classList.add('is-invalid');
				return;
			}
			this.temperatureInput.parentElement.classList.remove('is-invalid');
			this.boothState.controlTemperature = +this.temperatureInput.value;
			this._writeState();
		});
	}

	_readState() {
		let xmlHttp = new XMLHttpRequest();
		xmlHttp.onreadystatechange = () => { 
			if (xmlHttp.readyState == 4 && xmlHttp.status == 200) {
				this.boothState = JSON.parse(xmlHttp.responseText);
				this._updateState();
			}
		}
		xmlHttp.open('GET', './booth/state', true);
		xmlHttp.send(null);
	}

	_writeState() {
		let xmlHttp = new XMLHttpRequest();
		xmlHttp.open('PUT', './booth/state', true);
		xmlHttp.setRequestHeader('Content-Type', 'application/json;charset=UTF-8');
		xmlHttp.send(JSON.stringify(this.boothState));
	}

	_updateState() {
		this.floorTemperatureLabel.innerText = (this.boothState.temperatureFloor ? Math.round(this.boothState.temperatureFloor) : '') + ' ℃';
		this.boothTemperatureLabel.innerText = (this.boothState.temperatureAir ? Math.round(this.boothState.temperatureAir) : '') + ' ℃';
		if (this.boothState.powerOn) {
			this.powerSwitch.parentElement.MaterialSwitch.on();
		} else {
			this.powerSwitch.parentElement.MaterialSwitch.off();
		}
		if (this.boothState.autoMode) {
			this.autoSwitch.parentElement.MaterialSwitch.on();
		} else {
			this.autoSwitch.parentElement.MaterialSwitch.off();
		}
		this.temperatureInput.value = this.boothState.controlTemperature;
		this.lastCheckLabel.innerText = this._millisToHoursMinutesAndSeconds(this.boothState.lastCheck);
		this.heatOnLabel.innerText = this._millisToHoursMinutesAndSeconds(this.boothState.heatOnTime);
		if (this.boothState.relayFloorOn) {
			this.floorSwitch.parentElement.MaterialSwitch.on();
		} else {
			this.floorSwitch.parentElement.MaterialSwitch.off();
		}
		if (this.boothState.relayHeaterOn) {
			this.heaterSwitch.parentElement.MaterialSwitch.on();
		} else {
			this.heaterSwitch.parentElement.MaterialSwitch.off();
		}
		this._updateComponentsVisible();
	}

	_updateComponentsVisible() {
		if (this.boothState.powerOn) {
			this.autoCard.classList.remove('d-none');
			this.floorCard.classList.remove('d-none');
			this.heaterCard.classList.remove('d-none');
			this.heatOnCard.classList.remove('d-none');
			if (this.boothState.autoMode) {
				this.temperatureCard.classList.remove('d-none');
				this.lastCheckCard.classList.remove('d-none');
				this.floorSwitch.parentElement.MaterialSwitch.disable();
				this.heaterSwitch.parentElement.MaterialSwitch.disable();
			} else {
				this.temperatureCard.classList.add('d-none');
				this.lastCheckCard.classList.add('d-none');
				this.floorSwitch.parentElement.MaterialSwitch.enable();
				this.heaterSwitch.parentElement.MaterialSwitch.enable();
			}
		} else {
			this.autoCard.classList.add('d-none');
			this.temperatureCard.classList.add('d-none');
			this.lastCheckCard.classList.add('d-none');
			this.heatOnCard.classList.add('d-none');
			this.floorCard.classList.add('d-none');
			this.heaterCard.classList.add('d-none');
		}
	}

	_millisToHoursMinutesAndSeconds(millis) {
		let seconds = Math.floor((millis / 1000) % 60);
		let minutes = Math.floor((millis / (1000 * 60)) % 60);
		let hours = Math.floor((millis / (1000 * 60 * 60)) % 24);
	  
		hours = (hours < 10) ? '0' + hours : hours;
		minutes = (minutes < 10) ? '0' + minutes : minutes;
		seconds = (seconds < 10) ? '0' + seconds : seconds;
	  
		return hours + ":" + minutes + ":" + seconds;
	  }
}