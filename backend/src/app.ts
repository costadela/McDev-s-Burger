import express, { type Request, type Response } from "express";
import { prisma } from "./db.ts";
import cors from "cors";

const app = express();

app.use(cors({ origin: "http://localhost:5173" })); // Permite requisições do front
app.use(express.json()); // Necessário para ler JSON no corpo das requisições (POST/PUT/PATCH)

/*
Rota inicial de teste
app.get('/', (req: Request, res: Response) => {
  res.json({ message: 'API do McDev\'s Burger funcionando!' });
});
*/

app.post("/login", async (req: Request, res: Response) => {
  const { email, password } = req.body;

  const user = await prisma.user.findUnique({
    where: { email },
  });

  if (!user || user.password !== password) {
    return res.status(401).json({ message: "E-mail ou senha inválidos" });
  }

  const { password: _, ...userWithoutPassword } = user;
  res.json(userWithoutPassword);
});

export default app;
