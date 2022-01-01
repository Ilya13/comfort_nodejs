import { BaseComponent } from './base.component.js';

export class MainComponent extends BaseComponent {
    state = {
        boothState: {
            temperatureOutSide: null,
            temperatureFloor: null,
            temperatureAir: null,
        },
        houseState: {
            humidity: null,
            temperature: null,
        },
    };
	temperatureOutSideLabel;
	temperatureLabel;
	humidityLabel;
	boothTemperatureLabel;
	boothTemperatureFloorLabel;

    getTemplate() {
        return `
            <div class="container">
                <div class="mdl-card mdl-shadow--4dp portfolio-card" style="background-color: #00ddff">
					<div class="mdl-card__title">
						<h1 id="temperature-out-side-label" class="mdl-card__title-text label">&#8451;</h2>
						<div class="mdl-layout-spacer"></div>
						<img src="/assets/icons/sun.svg" alt="Sun" width="64" height="64"/>
					</div>
				</div>
                <div class="house mdl-card mdl-shadow--4dp portfolio-card" style="background-color: #99cc00">
					<div class="mdl-card__title">
                        <img src="/assets/icons/house.svg" alt="House" width="64" height="64"/>
                        <div class="mdl-layout-spacer"></div>
						<h1 id="temperature-label" class="mdl-card__title-text label">&#8451;</h2>
                        <div class="mdl-layout-spacer"></div>
						<h1 id="humidity-label" class="mdl-card__title-text label">%</h2>
					</div>
				</div>
                <div class="booth mdl-card mdl-shadow--4dp portfolio-card" style="background-color: #669900">
					<div class="mdl-card__title">
                        <h1 id="booth-temperature-label" class="mdl-card__title-text label">&#8451;</h2>
                        <div class="mdl-layout-spacer"></div>
						<h1 id="booth-temperature-floor-label" class="mdl-card__title-text label">&#8451;</h2>
						<div class="mdl-layout-spacer"></div>
						<img src="/assets/icons/dog.svg" alt="Dog" width="64" height="64"/>
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
        this.temperatureOutSideLabel = document.getElementById('temperature-out-side-label');
		this.temperatureLabel = document.getElementById('temperature-label');
		this.humidityLabel = document.getElementById('humidity-label');
		this.boothTemperatureLabel = document.getElementById('booth-temperature-label');
		this.boothTemperatureFloorLabel = document.getElementById('booth-temperature-floor-label');
    }

    _addListeners() {
        const house = document.getElementsByClassName('house')[0];
        const booth = document.getElementsByClassName('booth')[0];
        this.addEventListener(house, 'click', () => this.navigateTo('house'));
        this.addEventListener(booth, 'click', () => this.navigateTo('booth'));
    }

    _readState() {
		this._readHouseState();
        this._readBoothState();
	}

    _readHouseState() {
		let xmlHttp = new XMLHttpRequest();
		xmlHttp.onreadystatechange = () => { 
			if (xmlHttp.readyState == 4 && xmlHttp.status == 200) {
				this.state.houseState = JSON.parse(xmlHttp.responseText);
				this._updateState();
			}
		}
		xmlHttp.open('GET', './house/state', true);
		xmlHttp.send(null);
	}

    _readBoothState() {
		let xmlHttp = new XMLHttpRequest();
		xmlHttp.onreadystatechange = () => { 
			if (xmlHttp.readyState == 4 && xmlHttp.status == 200) {
				this.state.boothState = JSON.parse(xmlHttp.responseText);
				this._updateState();
			}
		}
		xmlHttp.open('GET', './booth/state', true);
		xmlHttp.send(null);
	}

    _updateState() {
        if (this.state.boothState) {
            this.temperatureOutSideLabel.innerText = (this.state.boothState.temperatureOutSide !== null && this.state.boothState.temperatureOutSide !== undefined ? Math.round(this.state.boothState.temperatureOutSide) : '') + ' ℃';
            this.boothTemperatureLabel.innerText = (this.state.boothState.temperatureAir !== null && this.state.boothState.temperatureAir !== undefined ? Math.round(this.state.boothState.temperatureAir) : '') + ' ℃';
            this.boothTemperatureFloorLabel.innerText = (this.state.boothState.temperatureFloor !== null && this.state.boothState.temperatureFloor !== undefined ? Math.round(this.state.boothState.temperatureFloor) : '') + ' ℃';
        }
        if (this.state.houseState) {
            this.temperatureLabel.innerText = (this.state.houseState.temperature !== null && this.state.houseState.temperature !== undefined ? Math.round(this.state.houseState.temperature) : '') + ' ℃';
            this.humidityLabel.innerText = (this.state.houseState.humidity !== null && this.state.houseState.humidity !== undefined ? Math.round(this.state.houseState.humidity) : '') + ' %';
        }
    }
}