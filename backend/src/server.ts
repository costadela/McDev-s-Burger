import app from "./app.ts";

const PORT = Number(process.env.PORT) || 3000;

app.listen(PORT, (error) => {
  if (error) {
    console.error("Erro ao iniciar o servidor:", error);
    process.exit(1);
  }

  console.log(`Servidor rodando na porta ${PORT}`);
});