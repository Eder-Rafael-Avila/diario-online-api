import { Router } from 'express';
const endpoints = Router();

import * as service from '../service/administradoresService.js';

endpoints.post('/saveAdmin', async (req, res) => {
    try {
        const admin = req.body;

        const result = await service.saveAdmin(admin);
        res.send(result);
    } catch (e) {
        console.log(`Ocorreu um erro ao inserir Admin: ${e}`);
        res.status(400).send({
            errorMessage: e.message
        });
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
    } catch (e) {
        console.log(`Ocorreu um erro ao procurar o e-mail: ${e}`);
        res.status(400).send({
            errorMessage: e.message
        });
    }
})

endpoints.get('/getAdminById/:id', async (req, res) => {
    try {
        const id = req.params.id;

        const result = await service.getAdminById(id);
        res.send(result);
    } catch (e) {
        console.log(`Ocorreu um erro ao procurar o ID: ${e}`);
        res.status(400).send({
            errorMessage: e.message
        });
    }
})

endpoints.put('/editAdmin/:id', async (req, res) => {
    try {
        const admin = req.body;
        const id = req.params.id;

        const result = await service.editAdmin(admin, id);
        res.send({idAlterado: id});
    } catch (e) {
        console.log(`Ocorreu um erro ao alterar: ${e}`);
        res.status(400).send({
            errorMessage: e.message
        });
    }
})

endpoints.delete('/deleteAdmin/:id', async (req, res) => {
    try {
        const id = req.params.id;

        const result = await service.deleteAdmin(id);
        res.send({idDeletado: id});
    } catch (e) {
        console.log(`Ocorreu um erro ao deletar: ${e}`);
        res.status(400).send({
            errorMessage: e.message
        });
    }
})

endpoints.get('/consultarRenda', async (req, res) => {
    try {
        const result = await service.consultarRenda();
        res.send({
            renda: result
        })
    } catch (e) {
        console.log(`Ocorreu um erro ao deletar: ${e}`);
        res.status(400).send({
            errorMessage: e.message
        });
    }
})

export default endpoints;