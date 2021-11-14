import { MainComponent } from './pages/main.js';
import { HouseComponent } from './pages/house.js';
import { BoothComponent } from './pages/booth.js';
import router from './router.js';

router.registerRoutes([
    { path: '/', component: MainComponent },
    { path: '/house', component: HouseComponent },
    { path: '/booth', component: BoothComponent },
]);
