import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import { router } from "./routes.ts";

const app = express();

app.set("trust proxy", 1); // A Hostinger fica na frente do Express: confia no IP real que ela repassa (usado pelo rate limit)
app.use(cors({ origin: process.env.FRONTEND_URL, credentials: true })); // Permite requisições do front
app.use(express.json()); // Lê JSON no corpo das requisições (POST/PUT/PATCH)
app.use(cookieParser()); // Lê os cookies das requisições (precisa vir ANTES das rotas)
app.use(router); // Rotas da aplicação (sempre por último)

export default app;