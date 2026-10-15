import Health from './controller/healthController.js';
import Admin from './controller/administradoresController.js';
import User from './controller/usuariosController.js';
import Anotacoes from './controller/anotacoesController.js';
import Lembretes from './controller/lembretesController.js';
import Assinaturas from './controller/assinaturasController.js';

export function addRoutes(api) {
    api.use(Health);
    api.use(Admin);
    api.use(User);
    api.use(Anotacoes);
    api.use(Lembretes);
    api.use(Assinaturas);
}