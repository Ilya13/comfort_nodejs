import { MainComponent } from './pages/main.js';
import { HouseComponent } from './pages/house.js';
import { BoothComponent } from './pages/booth.js';
import router from './router.js';

router.registerRoutes([
    { path: '/', component: MainComponent },
    { path: '/house', component: HouseComponent },
    { path: '/booth', component: BoothComponent },
]);

async function registerSW() {
    if ('serviceWorker' in navigator) {
        try {
            await navigator.serviceWorker.register('/sw.js');
        } catch (e) {
            console.log(e);
            // alert('ServiceWorker registration failed. Sorry about that.');
        }
    } else {
        // document.querySelector('.alert').removeAttribute('hidden');
    }
}

registerSW();
