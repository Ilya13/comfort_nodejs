import { BaseComponent } from './base.component.js';
import snackbarContainer from '../snackbar.js';

export class HouseComponent extends BaseComponent {
	_homeState;
	_dimmers;
	_espHost = 'http://192.168.31.213';

	getTemplate() {
		return `
			<div class="house-container">
				<div class="mdl-card mdl-shadow--4dp portfolio-card" style="background-color: #FFDE03">
					<div class="mdl-card__title">
						<h2 class="mdl-card__title-text">Гостинная</h2>
						<div class="mdl-layout-spacer"></div>
						<img src="/assets/icons/sofa.svg" alt="Sofa" width="36" height="36"/>
					</div>
					<div class="mdl-card__actions mdl-card--border">
						<div>
							<label class="mdl-switch mdl-js-switch mdl-js-ripple-effect" for="dimmer-1">
								<input type="checkbox" id="dimmer-1" class="mdl-switch__input dimmer__input">
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
							<label class="mdl-switch mdl-js-switch mdl-js-ripple-effect" for="dimmer-2">
								<input type="checkbox" id="dimmer-2" class="mdl-switch__input dimmer__input">
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
							<label class="mdl-switch mdl-js-switch mdl-js-ripple-effect" for="dimmer-3">
								<input type="checkbox" id="dimmer-3" class="mdl-switch__input dimmer__input">
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
							<label class="mdl-switch mdl-js-switch mdl-js-ripple-effect" for="dimmer-4">
								<input type="checkbox" id="dimmer-4" class="mdl-switch__input dimmer__input">
								<span class="mdl-switch__label"></span>
							</label>
						</div>
					</div>
				</div>
				<div class="mdl-card mdl-shadow--4dp portfolio-card" style="background-color: #9E9E9E">
					<div class="mdl-card__title">
						<h2 class="mdl-card__title-text">Копьютер</h2>
						<div class="mdl-layout-spacer"></div>
						<img src="/assets/icons/desk.svg" alt="Desk" width="36" height="36"/>
					</div>
					<div class="mdl-card__actions mdl-card--border flex-space">
						<button class="mdl-button mdl-js-button mdl-button--raised mdl-button--accent" id="pc-on">
							Включить
						</button>
						<button class="mdl-button mdl-js-button mdl-button--raised mdl-button--accent" id="pc-off">
							Выключить
						</button>
						<button class="mdl-button mdl-js-button mdl-button--raised" id="pc-off-cancel">
							Отменить
						</button>
					</div>
				</div>
			</div>
		`;
	}

	onInit() {
		this._dimmers = document.getElementsByClassName('mdl-switch');
		this._addPcHandlers();
		this._addDimmerHandlers();
		this._readDimmerStates();
	}

	_readDimmerStates() {
		let xmlHttp = new XMLHttpRequest();
		xmlHttp.onreadystatechange = function() { 
			if (xmlHttp.readyState == 4 && xmlHttp.status == 200) {
				this._homeState = JSON.parse(xmlHttp.responseText);
				this._updateState();
			}
		}
		xmlHttp.open('GET', this._espHost + '/state', true);
		xmlHttp.send(null);
	}

	_updateState() {
		for (let i = 0; i < this._dimmers.length; i++) {
			if (this._homeState.dimmers[i].state === 1) {
				this._dimmers[i].MaterialSwitch.on();
			} else {
				this._dimmers[i].MaterialSwitch.off();
			}
		}
	}

	_addPcHandlers() {
		const pcOn = document.getElementById('pc-on');
		this.addEventListener(pcOn, 'click', () => this._powerOnPC());
		
		const pcOff = document.getElementById('pc-off');
		this.addEventListener(pcOff, 'click', () => this._powerOffPC());
		
		const pcOffCancel = document.getElementById('pc-off-cancel');
		this.addEventListener(pcOffCancel, 'click', () => this._powerOffPCCancel());
	}

	_addDimmerHandlers() {
		for (let i = 0; i < this._dimmers.length; i++) {
			this.addEventListener(this._dimmers[i].children[0], 'change', (event) => {
				const index = event.currentTarget.id.split('-')[1];
				this._homeState.dimmers[index - 1].state = this._homeState.dimmers[index - 1].state === 1 ? 0 : 1;
				const xmlHttp = new XMLHttpRequest();
				xmlHttp.open('GET', this._espHost + '/dimmer?i=' + index + '&s=' + this._homeState.dimmers[index - 1].state, true);
				xmlHttp.send(null);
			});
		}
	}

	_powerOnPC() {

	}

	_powerOffPC() {
		let xmlHttp = new XMLHttpRequest();
		xmlHttp.onreadystatechange = function() { 
			if (xmlHttp.readyState == 4 && xmlHttp.status == 200) {
				snackbarContainer.MaterialSnackbar.showSnackbar({message: 'Выключение запущено'});
			}
		}
		xmlHttp.open('GET', '/off', true);
		xmlHttp.send(null);
	}

	_powerOffPCCancel() {
		let xmlHttp = new XMLHttpRequest();
		xmlHttp.onreadystatechange = function() { 
			if (xmlHttp.readyState == 4 && xmlHttp.status == 200) {
				snackbarContainer.MaterialSnackbar.showSnackbar({message: 'Выключение отменено'});
			}
		}
		xmlHttp.open('GET', '/off/cancel', true);
		xmlHttp.send(null);
	}
}