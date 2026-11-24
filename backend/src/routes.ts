import { Router } from "express";
import { login, cadastro, auth, logout } from "./controller/userController.ts";
import authMiddleware from "./middleware/auth.ts";
import { loginLimiter } from "./middleware/rateLimit.ts";
import { getProducts } from "./controller/product-controller.ts";
// import { createOrder, getOrders } from "./controller/order-controller.ts"; // Ainda não existe

export const router = Router();

// Rotas públicas (não precisa estar logado)
router.post("/login", loginLimiter, login);
router.post("/cadastro", cadastro);

// Rotas protegidas (o middleware verifica o cookie antes)
router.get("/me", authMiddleware, auth);
router.post("/logout", authMiddleware, logout);

// Rotas de produtos (pública: qualquer um pode ver o cardápio)
router.get("/products", getProducts);

// Rotas de pedidos (descomentar quando criarmos o order-controller)
// router.post("/orders", authMiddleware, createOrder);
// router.get("/orders", authMiddleware, getOrders);