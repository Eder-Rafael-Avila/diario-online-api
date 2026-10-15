import { Router } from 'express';
const endpoints = Router();

import * as service from '../service/assinaturasService.js';

endpoints.post('/saveAssinatura', async (req, res) => {
    try {
        const assinatura = req.body;
        const dataAtual = new Date();

        let valor;
        
        if (assinatura.periodo == 'Mensal') {
            valor = 19.99;
        } else if (assinatura.periodo == 'Anual') {
            valor = 149.90;
        } else {
            throw new Error('Período inválido.')
        }
            
        let status;
        console.log(valor)

        const timestampDb = new Date(assinatura.data_expiracao).getTime();
        const timestampAtual = dataAtual.getTime();

        if (timestampDb < timestampAtual) {
            status = 'Expirado';
        } else {
            status = 'Ativo';
        }

        console.log(status);

        const result = await service.saveAssinatura(assinatura, dataAtual, status, valor);

        res.send({idCriado: result});
    } catch (e) {
        console.log(`Ocorreu um erro ao registrar assinatura: ${e}`);
        res.status(400).send({
            errorMessage: e.message
        });
    }
})

endpoints.get('/assinaturas', async (req, res) => {
    try {
        const result = await service.getAssinaturas();
        res.send(result);
    } catch (e) {
        console.log(`Ocorreu um erro ao consultar assinaturas: ${e}`);
        res.status(400).send({
            errorMessage: e.message
        });
    }
})

export default endpoints;