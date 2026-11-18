import { Router } from "express";
import { login, cadastro, auth, logout } from "./controller/userController.ts";
import authMiddleware from "./middleware/auth.ts";

export const router = Router();

// Rotas públicas (não precisa estar logado)
router.post("/login", login);
router.post("/cadastro", cadastro);

// Rotas protegidas (o middleware verifica o cookie antes)
router.get("/me", authMiddleware, auth);
router.post("/logout", authMiddleware, logout);