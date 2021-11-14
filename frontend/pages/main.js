import { BaseComponent } from './base.component.js';

export class MainComponent extends BaseComponent {
    getTemplate() {
        return `
            <div class="main-container">
                <div class="house main-card mdl-card mdl-shadow--4dp">
                    <div class="mdl-card__title">
                        <img src="/assets/icons/house.svg" alt="House" width="128" height="128"/>
                    </div>
                </div>
                <div class="booth main-card mdl-card mdl-shadow--4dp">
                    <div class="mdl-card__title">
                        <img src = "/assets/icons/dog.svg" alt="Dog" width="128" height="128"/>
                    </div>
                </div>
            </div>
        `;
    }

    onInit() {
        const house = document.getElementsByClassName('house')[0];
        const booth = document.getElementsByClassName('booth')[0];
        this.addEventListener(house, 'click', () => this.navigateTo('house'));
        this.addEventListener(booth, 'click', () => this.navigateTo('booth'));
    }
}