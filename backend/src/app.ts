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
  try {
    const { email, password } = req.body;

    // 400: dados faltando
    if (!email || !password) {
      return res.status(400).json({ message: "Informe e-mail e senha" });
    }

    const user = await prisma.user.findUnique({
      where: { email },
    });
    // 401: usuário não existe ou senha errada (mesma mensagem de propósito)
    if (!user || user.password !== password) {
      return res.status(401).json({ message: "E-mail ou senha inválidos" });
    }
    // 200: login certo, devolve o usuário sem a senha
    const { password: _, ...userWithoutPassword } = user;
    return res.json(userWithoutPassword);
  } catch (error) {
    // 500: qualquer erro inesperado (banco fora do ar, etc.)
    console.error("Erro no login:", error);
    return res.status(500).json({ message: "Erro interno, tente novamente" });
  }
});

export default app;
