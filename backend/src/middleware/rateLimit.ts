import { rateLimit } from "express-rate-limit";

// Máximo de 5 tentativas de login erradas a cada 15 minutos, por IP
export const loginLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutos (em milissegundos)
  limit: 5,                 // tentativas permitidas nessa janela
  skipSuccessfulRequests: true, // login certo não conta, só os errados
  standardHeaders: "draft-8",   // informa o limite nos headers da resposta
  legacyHeaders: false,
  message: { message: "Muitas tentativas. Tente novamente em 15 minutos." },
});