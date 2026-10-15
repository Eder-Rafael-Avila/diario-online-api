import { Router } from 'express';
const endpoints = Router();

import * as service from '../service/anotacoesService.js';

endpoints.get('/anotacoes', async (req, res) => {
    const result = await service.getAnotacoes();
    res.send(result);
})

endpoints.post('/saveAnotacao', async (req, res) => {
    try {
        const anot = req.body;
        const data = new Date()

        const result = await service.saveAnotacao(anot, data);
        res.send({idCriado: result})
    } catch (e) {
        console.log(`Ocorreu um erro ao criar a anotação: ${e}`);
        res.status(400).send({
            errorMessage: e.message
        });
    }
})

endpoints.put('/editAnotacao/:id', async (req, res) => {
    try {
        const anotacao = req.body;
        const id = req.params.id;
        const data = new Date();

        const result = await service.editAnotacao(anotacao, id, data);
        res.send({linhasAlteradas: result});
    } catch (e) {
        console.log(`Ocorreu um erro ao editar anotação: ${e}`);
        res.status(400).send({
            errorMessage: e.message
        });
    }
})

endpoints.delete('/deleteAnot/:id', async (req, res) => {
    try {
        const id = req.params.id;

        const result = await service.deleteAnotacao(id);
        res.send({idsDeletados: result});
    } catch (e) {
        console.log(`Ocorreu um erro ao deletar anotação: ${e}`);
        res.status(400).send({
            errorMessage: e.message
        });
    }
})

endpoints.put('/mudarTema/:id', async (req, res) => {
    
    try {
        const idTema = req.body.id_tema;
        const idAnot = req.params.id;

        const result = await service.mudarTema(idTema, idAnot);
        res.send({affectedRows: result});
    } catch (e) {
        console.log(`Ocorreu um erro ao mudar tema: ${e}`);
        res.status(400).send({
            errorMessage: e.message
        });
    }
    
})

endpoints.get('/anotacoesRecentes', async (req, res) => {
    try {
        const result = await service.anotacoesRecentes();
        res.send(result);
    } catch (e) {
        console.log(`Ocorreu um erro ao mudar tema: ${e}`);
        res.status(400).send({
            errorMessage: e.message
        });
    }
})

export default endpoints;