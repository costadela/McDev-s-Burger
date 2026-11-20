import type { Request, Response } from "express";
import { prisma, Prisma } from "../db.ts";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import type { UserPayload } from "../types/user.ts";
import { COOKIE_NAME, ONE_HOUR_MS } from "../config/auth.ts";

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const COMMON_PASSWORDS = [
  "12345678",
  "123456789",
  "senha123",
  "password",
  "qwerty123",
  "11111111",
];

export const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body ?? {};

    // 400: dados faltando
    if (!email || !password) {
      return res.status(400).json({ message: "Informe e-mail e senha" });
    }

    const normalizedEmail = String(email).trim().toLowerCase();

    const user = await prisma.user.findUnique({
      where: { email: normalizedEmail },
    });

    // 401: usuário não existe ou senha errada (mesma mensagem de propósito)
    if (!user || !(await bcrypt.compare(String(password), user.password))) {
      return res.status(401).json({ message: "E-mail ou senha inválidos" });
    }

    // Sem chave secreta não dá para assinar o token com segurança
    const secret = process.env.JWT_SECRET;
    if (!secret) {
      console.error("JWT_SECRET não definida no .env");
      return res.status(500).json({ message: "Erro interno, tente novamente" });
    }

    // Só os dados que podem sair do servidor (nunca a senha)
    const tokenData: UserPayload = {
      id: user.id,
      name: user.name,
      email: user.email,
      cep: user.cep,
      admin: user.admin,
    };

    // Token assinado com os dados do usuário (expiresIn em segundos)
    const token = jwt.sign(tokenData, secret, {
      expiresIn: ONE_HOUR_MS / 1000,
    });

    // O cookie guarda o token assinado: se alguém alterar o conteúdo, a assinatura não bate e o servidor recusa
    res.cookie(COOKIE_NAME, token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: ONE_HOUR_MS, // em milissegundos
    });

    // 200: login certo, devolve o usuário sem a senha
    return res.status(200).json(tokenData);
  } catch (error) {
    // 500: qualquer erro inesperado (banco fora do ar, etc.)
    console.error("Erro no login:", error);
    return res.status(500).json({ message: "Erro interno, tente novamente" });
  }
};

export const cadastro = async (req: Request, res: Response) => {
  try {
    const { name, email, password, cep } = req.body ?? {};

    const cleanName = String(name ?? "").trim();
    const normalizedEmail = String(email ?? "")
      .trim()
      .toLowerCase();
    const cleanPassword = String(password ?? "");
    const cleanCep = String(cep ?? "").replace(/\D/g, "");

    // 400: dados faltando
    if (!cleanName || !normalizedEmail || !cleanPassword || !cleanCep) {
      return res
        .status(400)
        .json({ message: "Todas as informações são obrigatórias" });
    }

    // 400: formato de e-mail
    if (!EMAIL_REGEX.test(normalizedEmail)) {
      return res.status(400).json({ message: "E-mail inválido" });
    }

    // 400: senha mínima
    if (cleanPassword.length < 8) {
      return res
        .status(400)
        .json({ message: "A senha deve ter pelo menos 8 caracteres" });
    }

    // 400: senha muito comum
    if (COMMON_PASSWORDS.includes(cleanPassword.toLowerCase())) {
      return res
        .status(400)
        .json({ message: "Essa senha é muito comum, escolha outra" });
    }

    // 400: senha máxima (o bcrypt só considera os primeiros 72 bytes)
    if (Buffer.byteLength(cleanPassword, "utf8") > 72) {
      return res
        .status(400)
        .json({ message: "A senha deve ter no máximo 72 caracteres" });
    }

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

    const passwordHash = await bcrypt.hash(cleanPassword, 10);

    await prisma.user.create({
      data: {
        name: cleanName,
        email: normalizedEmail,
        password: passwordHash,
        cep: cleanCep,
      },
    });

    return res.status(201).json({ message: "Usuário cadastrado com sucesso" });
  } catch (error) {
    // 409: e-mail duplicado em requisições simultâneas
    if (
      error instanceof Prisma.PrismaClientKnownRequestError &&
      error.code === "P2002"
    ) {
      return res.status(409).json({ message: "E-mail já cadastrado" });
    }

    // 500: qualquer erro inesperado (banco fora do ar, etc.)
    console.error("Erro no cadastro:", error);
    return res.status(500).json({ message: "Erro interno, tente novamente" });
  }
};

export const auth = (req: Request, res: Response) => {
  return res.status(200).json(req.user);
};

export const logout = (req: Request, res: Response) => {
  res.clearCookie(COOKIE_NAME, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
  });
  return res.status(200).json({ message: "Logout realizado" });
};
