import express from 'express';
import { PrismaClient } from '@prisma/client'

import { booksQuery } from './src/bookQuery.js';

const app = express();
const port = 8080;

// Middleware para parsear URL-encoded bodies
app.use(express.urlencoded({ extended: true }));

app.get('/', async (req, res) => {
    try {
        const obj = [{
            tableName: 'livro',
            isbn: '9781649374042',
            atributes: { titulo: true, autor: true },
            filters: [{
                autor: {
                    equals: 'Agatha Christie'
                }
            },
            {
                isbn: {
                    equals: '9786585208109'
                }
            }]
        }
        // ,
        // {
        //     tableName: 'review',
        //     atributes: { autor: true, sumario: true }
        // },
        // {
        //     tableName: 'livros_da_lista'
        // }
        ]

        const prisma = new PrismaClient();
        const book = await booksQuery(obj, prisma);
        await prisma.$disconnect().catch(async (e) => {
            console.error(e)
            await prisma.$disconnect()
            process.exit(1)
        });

        res.send(book);
    } catch (erro) {
        console.log(erro);
    }

});

app.get('*', (req, res) => {
    res.status(404).json({ error: 'Página não encontrada!' });
});

// Inicialização do servidor
app.listen(port, () => {
    console.log('Servidor na porta: localhost:' + port);
});
