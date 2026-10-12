import { Router } from 'express';
const endpoints = Router();

import * as service from '../service/administradoresService.js';

endpoints.post('/saveAdmin', async (req, res) => {
    try {
        const admin = req.body;

        const result = await service.saveAdmin(admin);
        res.send(result);
    } catch(Error) {
        console.log(`Ocorreu um erro ao inserir Admin: ${Error}`);
        res.status(400).send({
            error: Error.message
        })
    }
})

endpoints.get('/admins', async (req, res) => {
    const result = await service.getAdmin();
    res.send(result);
})

endpoints.get('/getAdminByEmail/:email', async (req, res) => {
    try {
        const email = req.params.email;

        const result = await service.getAdminByEmail(email);
        res.send(result);
    } catch(e) {
        console.log(`Ocorreu um erro ao procurar o e-mail: ${e}`);
    }
})

endpoints.delete('/deleteAdmin', async (req, res) => {
    try {
        
    }
})

export default endpoints;