class Router {
    routes = [];
    currentComponent;
    routerOutlet = document.getElementById('router_outlet');

    constructor() {
        window.addEventListener('popstate', () => {
            const path = window.location.pathname
            this._router(path);
        });
    }

    registerRoutes(routes) {
        this.routes = routes;
        const path = window.location.pathname
        this._router(path);
    }

    navigateTo(url) {
        history.pushState(null, null, url);
        this._router(url);
    }
 
    _router(url) {
        const route = this.routes.find((route) => route.path === url);
        if (route) {
            this._loadComponent(route.component);
        } else {
            this.navigateTo('/');
        }
    }

    _loadComponent(component) {
        if (this.currentComponent) {
            this.currentComponent.onDestroy();
        }
        this.currentComponent = new component();
        this.routerOutlet.innerHTML = this.currentComponent.getTemplate();
        componentHandler.upgradeAllRegistered();
        this.currentComponent.onInit();
    }
}

export default new Router();