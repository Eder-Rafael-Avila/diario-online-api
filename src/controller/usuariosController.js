import { Router } from 'express';
const endpoints = Router();

import * as service from '../service/usuariosService.js';

endpoints.post('/registerUser', async (req, res) => {
    try {
        const user = req.body;

        const result = await service.saveUser(user);
        res.send(result);
    } catch (e) {
        console.log(`Ocorreu um erro ao registrar usuário: ${e}`);
        res.status(400).send({
            errorMessage: e.message
        });
    }
})

endpoints.get('/users', async (req, res) => {
    const result = await service.getUser();
    res.send(result);
})

endpoints.get('/getUserByEmail/:email', async (req, res) => {
    try {
        const email = req.params.email;

        const result = await service.getUserByEmail(email);
        res.send(result);
    } catch (e) {
        console.log(`Ocorreu um erro ao procurar o e-mail: ${e}`);
        res.status(400).send({
            errorMessage: e.message
        });
    }
})

endpoints.get('/getUserById/:id', async (req, res) => {
    try {
        const id = req.params.id;

        const result = await service.getUserById(id);
        res.send(result);
    } catch (e) {
        console.log(`Ocorreu um erro ao procurar o ID: ${e}`);
        res.status(400).send({
            errorMessage: e.message
        });
    }
})

endpoints.put('/editUser/:id', async (req, res) => {
    try {
        const user = req.body;
        const id = req.params.id;

        const result = await service.editUser(user, id);
        res.send({idAlterado: id});
    } catch (e) {
        console.log(`Ocorreu um erro ao alterar: ${e}`);
        res.status(400).send({
            errorMessage: e.message
        });
    }
})

endpoints.put('/editPassword/:id', async (req, res) => {
    try {
        const user = req.body;
        const id = req.params.id

        const result = await service.editPassword(user.senha, id, user.securityKey);
        res.send({
            message: 'Senha alterada com sucesso!'
        })
    } catch (e) {
        console.log(`Ocorreu um erro ao editar: ${e}`);
        res.status(400).send({
            errorMessage: e.message
        });
    }
})

endpoints.delete('/deleteUser/:id', async (req, res) => {
    try {
        const id = req.params.id;

        const result = await service.deleteUser(id);
        res.send({idDeletado: id});
    } catch (e) {
        console.log(`Ocorreu um erro ao deletar: ${e}`);
        res.status(400).send({
            errorMessage: e.message
        });
    }
})

export default endpoints;