import type { Request, Response, NextFunction } from "express";
import { prisma } from "../db.ts";

const adminMiddleware = async (req: Request, res: Response, next: NextFunction) => {
  try {
    // O authMiddleware roda antes e coloca o usuário em req.user
    if (!req.user) {
      return res.status(401).json({ message: "Não autenticado" });
    }

    // Confere no banco, não no token: se alguém perder o admin, vale na hora
    const user = await prisma.user.findUnique({
      where: { id: req.user.id },
      select: { admin: true },
    });

    // 403: está logado, mas não é admin (ou o usuário foi apagado)
    if (!user?.admin) {
      return res.status(403).json({ message: "Acesso negado" });
    }

    return next();
  } catch (error) {
    console.error("Erro no middleware de admin:", error);
    return res.status(500).json({ message: "Erro interno, tente novamente" });
  }
};

export default adminMiddleware;