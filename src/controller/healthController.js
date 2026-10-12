import  { Router } from 'express';
const endpoints = Router();

endpoints.get('/health', (req, res) => {
    res.send({
        message: 'API saudável.'
    });
})

export default endpoints;