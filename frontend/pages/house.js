import { BaseComponent } from './base.component.js';
import snackbarContainer from '../snackbar.js';

export class HouseComponent extends BaseComponent {
	houseState = {
		humidity: null,
		temperature: null,
		relayKitchenOn: false,
		relayLivingOn: false,
		relayDiningOn: false,
		relayHallwayOn: false
	}
	temperatureLabel;
	humidityLabel;
	livingSwitch;
	diningSwitch;
	kitchenSwitch;
	hallwaySwitch;

	getTemplate() {
		return `
			<div class="container">
				<div class="temperature-container">
					<div class="mdl-card mdl-shadow--4dp portfolio-card" style="background-color: #FFDE03">
						<div class="mdl-card__title">
							<h3 id="temperature-label">&#8451;</h3>
							<div class="mdl-layout-spacer"></div>
							<img src="/assets/icons/temperature.svg" alt="Temperature" width="36" height="36"/>
						</div>
					</div>
					<div class="mdl-card mdl-shadow--4dp portfolio-card" style="background-color: #FF0266">
						<div class="mdl-card__title">
							<h3 id="humidity-label">&#8451;</h3>
							<div class="mdl-layout-spacer"></div>
							<img src="/assets/icons/humidity.svg" alt="Humidity" width="36" height="36"/>
						</div>
					</div>
				</div>
				<div class="mdl-card mdl-shadow--4dp portfolio-card" style="background-color: #FFDE03">
					<div class="mdl-card__title">
						<h2 class="mdl-card__title-text">Гостинная</h2>
						<div class="mdl-layout-spacer"></div>
						<img src="/assets/icons/sofa.svg" alt="Sofa" width="36" height="36"/>
					</div>
					<div class="mdl-card__actions mdl-card--border">
						<div>
							<label class="mdl-switch mdl-js-switch mdl-js-ripple-effect" for="living-switch">
								<input type="checkbox" id="living-switch" class="mdl-switch__input dimmer__input">
								<span class="mdl-switch__label"></span>
							</label>
						</div>
					</div>
				</div>
				<div class="mdl-card mdl-shadow--4dp portfolio-card" style="background-color: #FF0266">
					<div class="mdl-card__title">
						<h2 class="mdl-card__title-text">Столовая</h2>
						<div class="mdl-layout-spacer"></div>						
						<img src="/assets/icons/dining_table.svg" alt="Dining Table" width="36" height="36"/>
					</div>
					<div class="mdl-card__actions mdl-card--border">
						<div>
							<label class="mdl-switch mdl-js-switch mdl-js-ripple-effect" for="dining-switch">
								<input type="checkbox" id="dining-switch" class="mdl-switch__input dimmer__input">
								<span class="mdl-switch__label"></span>
							</label>
						</div>
					</div>
				</div>
				<div class="mdl-card mdl-shadow--4dp portfolio-card" style="background-color: #4CAF50">
					<div class="mdl-card__title">
						<h2 class="mdl-card__title-text">Кухня</h2>
						<div class="mdl-layout-spacer"></div>
						<img src="/assets/icons/fridge.svg" alt="Fridge" width="36" height="36"/>
					</div>
					<div class="mdl-card__actions mdl-card--border">
						<div>
							<label class="mdl-switch mdl-js-switch mdl-js-ripple-effect" for="kitchen-switch">
								<input type="checkbox" id="kitchen-switch" class="mdl-switch__input dimmer__input">
								<span class="mdl-switch__label"></span>
							</label>
						</div>
					</div>
				</div>
				<div class="mdl-card mdl-shadow--4dp portfolio-card" style="background-color: #009688">
					<div class="mdl-card__title">
						<h2 class="mdl-card__title-text">Прихожая</h2>
						<div class="mdl-layout-spacer"></div>
						<img src="/assets/icons/wardrobe.svg" alt="Wardrobe" width="36" height="36"/>
					</div>
					<div class="mdl-card__actions mdl-card--border">
						<div>
							<label class="mdl-switch mdl-js-switch mdl-js-ripple-effect" for="hallway-switch">
								<input type="checkbox" id="hallway-switch" class="mdl-switch__input dimmer__input">
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
		this.temperatureLabel = document.getElementById('temperature-label');
		this.humidityLabel = document.getElementById('humidity-label');
		this.livingSwitch = document.getElementById('living-switch');
		this.diningSwitch = document.getElementById('dining-switch');
		this.kitchenSwitch = document.getElementById('kitchen-switch');
		this.hallwaySwitch = document.getElementById('hallway-switch');
	}

	_readState() {
		let xmlHttp = new XMLHttpRequest();
		xmlHttp.onreadystatechange = () => { 
			if (xmlHttp.readyState == 4 && xmlHttp.status == 200) {
				this.houseState = JSON.parse(xmlHttp.responseText);
				this._updateState();
			}
		}
		xmlHttp.open('GET', './house/state', true);
		xmlHttp.send(null);
	}

	_writeState() {
		let xmlHttp = new XMLHttpRequest();
		xmlHttp.open('PUT', './house/state', true);
		xmlHttp.setRequestHeader('Content-Type', 'application/json;charset=UTF-8');
		xmlHttp.send(JSON.stringify(this.houseState));
	}

	_updateState() {
		this.temperatureLabel.innerText = (this.houseState.temperature !== null && this.houseState.temperature !== undefined ? Math.round(this.houseState.temperature) : '') + ' ℃';
		this.humidityLabel.innerText = (this.houseState.humidity !== null && this.houseState.humidity !== undefined ? Math.round(this.houseState.humidity) : '') + ' %';
		if (this.houseState.relayLivingOn) {
			this.livingSwitch.parentElement.MaterialSwitch.on();
		} else {
			this.livingSwitch.parentElement.MaterialSwitch.off();
		}
		if (this.houseState.relayDiningOn) {
			this.diningSwitch.parentElement.MaterialSwitch.on();
		} else {
			this.diningSwitch.parentElement.MaterialSwitch.off();
		}
		if (this.houseState.relayKitchenOn) {
			this.kitchenSwitch.parentElement.MaterialSwitch.on();
		} else {
			this.kitchenSwitch.parentElement.MaterialSwitch.off();
		}
		if (this.houseState.relayHallwayOn) {
			this.hallwaySwitch.parentElement.MaterialSwitch.on();
		} else {
			this.hallwaySwitch.parentElement.MaterialSwitch.off();
		}
	}

	_addListeners() {
		this.addEventListener(this.livingSwitch, 'change', () => {
			this.houseState.relayLivingOn = !this.houseState.relayLivingOn;
			this._writeState();
		});
		this.addEventListener(this.diningSwitch, 'change', () => {
			this.houseState.relayDiningOn = !this.houseState.relayDiningOn;
			this._writeState();
		});
		this.addEventListener(this.kitchenSwitch, 'change', () => {
			this.houseState.relayKitchenOn = !this.houseState.relayKitchenOn;
			this._writeState();
		});
		this.addEventListener(this.hallwaySwitch, 'change', () => {
			this.houseState.relayHallwayOn = !this.houseState.relayHallwayOn;
			this._writeState();
		});
	}
}