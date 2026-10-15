import { Router } from 'express';
const endpoints = Router();

import * as service from '../service/lembretesService.js';

endpoints.post('/saveLembrete', async (req, res) => {
    try {
        const lembrete = req.body;
        
        const dataAviso = lembrete.data_aviso;
        const dataAtual = new Date();
    
        const timestampDb = new Date(dataAviso).getTime();
        const timestampAtual = dataAtual.getTime();
    
        let concluido = timestampDb > timestampAtual ? 0 : 1;

        const result = await service.saveLembrete(lembrete, dataAtual, concluido);
        res.send({idCriado: result});
    } catch (e) {
        console.log(`Ocorreu um erro ao criar lembrete: ${e}`);
        res.status(400).send({
            errorMessage: e.message
        });
    } 
})

endpoints.get('/lembretes', async (req, res) => {
    try {
        const result = await service.getLembretes();
        res.send(result);
    } catch (e) {
        console.log(`Ocorreu um erro ao consultar: ${e}`);
        res.status(400).send({
            errorMessage: e.message
        });
    }
})

endpoints.put('/editLembrete/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const lembrete = req.body;

        const dataAviso = lembrete.data_aviso;
        const dataAtual = new Date();
    
        const timestampDb = new Date(dataAviso).getTime();
        const timestampAtual = dataAtual.getTime();
    
        let concluido = timestampDb > timestampAtual ? 0 : 1;

        const result = await service.editLembrete(lembrete, concluido, id);
        res.send({idAlterado: result});
    } catch (e) {
        console.log(`Ocorreu um erro ao editar o lembrete: ${e}`);
        res.status(400).send({
            errorMessage: e.message
        });
    }
})

endpoints.delete('/deleteLembrete/:id', async (req, res) => {
    try {
        const id = req.params.id;

        const result = await service.deleteLembrete(id);
        res.send({idsDeletados: result});
    } catch (e) {
        console.log(`Ocorreu um erro ao deletar o lembrete: ${e}`);
        res.status(400).send({
            errorMessage: e.message
        });
    }
})

endpoints.put('/marcarLembreteConcluido/:id', async (req, res) => {
    try {
        const id = req.params.id;

        const result = await service.markLembreteAsConcluido(id);
        res.send({idsAlterados: result});
    } catch (e) {
        console.log(`Ocorreu um erro ao marcar o lembrete como concluído: ${e}`);
        res.status(400).send({
            errorMessage: e.message
        });
    }
})

endpoints.get('/lembretesConcluidos', async (req, res) => {
    try {
        const result = await service.getLembretesConcluidos();
        res.send(result);
    } catch (e) {
        console.log(`Ocorreu um erro ao consultar lembretes concluídos: ${e}`);
        res.status(400).send({
            errorMessage: e.message
        });
    }
})

endpoints.get('/lembretesPendentes', async (req, res) => {
    try {
        const result = await service.getLembretesPendentes();
        res.send(result);
    } catch (e) {
        console.log(`Ocorreu um erro ao consultar lembretes pendentes: ${e}`);
        res.status(400).send({
            errorMessage: e.message
        });
    }
})

export default endpoints;