import express, { type Request, type Response } from 'express';

const app = express();

// Necessário para ler JSON no corpo das requisições (POST/PUT/PATCH)
app.use(express.json());

// Rota inicial de teste
app.get('/', (req: Request, res: Response) => {
  res.json({ message: 'API do McDev\'s Burger funcionando!' });
});

export default app;