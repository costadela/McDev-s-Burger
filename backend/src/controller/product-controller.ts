import type { Request, Response } from "express";
import { prisma } from "../db.ts";

export const getProducts = async (req: Request, res: Response) => {
  try {
    const products = await prisma.product.findMany({
      where: { available: true }, // só o que está no cardápio
      orderBy: { createdAt: "asc" },
    });

    // Array vazio NÃO é falsy em JS, por isso testamos o length 
    if (products.length === 0) {
      return res.status(404).json({ message: "Nenhum produto encontrado" });
    }

    return res.status(200).json(products);
  } catch (error) {
    console.error("Erro ao buscar produtos:", error);
    return res.status(500).json({ message: "Erro interno do servidor" });
  }
};