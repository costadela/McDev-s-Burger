import express, { type Request, type Response } from "express";
import { prisma } from "./db.ts";
import cors from "cors";
import bcrypt from "bcrypt";

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

    const normalizedEmail = String(email).trim().toLowerCase();

    const user = await prisma.user.findUnique({
      where: { email: normalizedEmail },
    });

    // 401: usuário não existe ou senha errada (mesma mensagem de propósito)
    if (!user || !(await bcrypt.compare(password, user.password))) {
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

app.post("/cadastro", async (req: Request, res: Response) => {
  try {
    const { name, email, password, cep } = req.body;

    // 400: dados faltando
    if (!name || !email || !password || !cep) {
      return res
        .status(400)
        .json({ message: "Todas as informações são obrigatórias" });
    }

    const normalizedEmail = String(email).trim().toLowerCase();
    const cleanCep = String(cep).replace(/\D/g, "");

    // 400: CEP precisa ter 8 números
    if (cleanCep.length !== 8) {
      return res.status(400).json({ message: "CEP inválido" });
    }

    // 409: e-mail já existe
    const user = await prisma.user.findUnique({
      where: { email: normalizedEmail },
    });
    if (user) {
      return res.status(409).json({ message: "E-mail já cadastrado" });
    }

    const passwordHash = await bcrypt.hash(password, 10);

    await prisma.user.create({
      data: {
        name,
        email: normalizedEmail,
        password: passwordHash,
        cep: cleanCep,
      },
    });

    return res.status(201).json({ message: "Usuário cadastrado com sucesso" });
  } catch (error) {
    // 500: qualquer erro inesperado (banco fora do ar, etc.)
    console.error("Erro no cadastro:", error);
    return res.status(500).json({ message: "Erro interno, tente novamente" });
  }
});

export default app;
