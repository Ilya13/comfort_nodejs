import router from '../router.js';

export class BaseComponent {
    _listeners = [];

    onDestroy() {
        this._listeners.forEach(listener => {
            listener.element.removeEventListener(listener.event, listener.listener);
        });
    }

    addEventListener(element, event, listener) {
        element.addEventListener(event, listener);
        this._listeners.push({ element, event, listener });
    }

    navigateTo(path) {
        router.navigateTo(`/${path}`);
    }
}