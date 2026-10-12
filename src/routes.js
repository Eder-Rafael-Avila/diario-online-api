import Health from './controller/healthController.js';
import Admin from './controller/administradoresController.js';

export function addRoutes(api) {
    api.use(Health);
    api.use(Admin);
}