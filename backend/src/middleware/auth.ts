import type { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import type { UserPayload } from "../types/user.ts";
import { COOKIE_NAME } from "../config/auth.ts";

const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
const token = req.cookies?.[COOKIE_NAME];

  if (!token) {
    return res.status(401).json({ message: "Não autenticado" });
  }

  const secret = process.env.JWT_SECRET;
  if (!secret) {
    console.error("JWT_SECRET não definida no .env");
    return res.status(500).json({ message: "Erro interno, tente novamente" });
  }

  try {
  const { id, name, email, cep, admin } = jwt.verify(token, secret) as UserPayload;
  req.user = { id, name, email, cep, admin };
} catch (error) {
    if (error instanceof jwt.JsonWebTokenError) {
      return res.status(401).json({ message: "Token inválido ou expirado" });
    }
    console.error("Erro no middleware de autenticação:", error);
    return res.status(500).json({ message: "Erro interno, tente novamente" });
  }
  return next();
};

export default authMiddleware;