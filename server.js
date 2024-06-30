import express from 'express';
import { PrismaClient } from '@prisma/client'

import { selectQuery } from './src/bookQuery.js';

const app = express();
const port = 8080;

// Middleware para parsear URL-encoded bodies
app.use(express.urlencoded({ extended: true }));

app.get('/', async (req, res) => {
    try {
        const prisma = new PrismaClient();
        const response = await selectQuery(req, prisma);
        await prisma.$disconnect().catch(async (e) => {
            console.error(e)
            await prisma.$disconnect()
            process.exit(1)
        });

        res.send(response);
    } catch (error) {
        console.log(error);
    }

});

app.get('*', (req, res) => {
    res.status(404).json({ error: 'Página não encontrada!' });
});

// Inicialização do servidor
app.listen(port, () => {
    console.log('Servidor na porta: localhost:' + port);
});
