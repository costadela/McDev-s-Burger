import { useContext, useEffect, type ReactNode } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../contexts/UserContext";

// Porteiro das páginas de login e cadastro: quem já está logado não entra
const PublicRoute = ({ children }: { children: ReactNode }) => {
  const { user } = useContext(UserContext);
  const navigate = useNavigate();

  useEffect(() => {
    // Tem usuário logado? Manda para a home, sem deixar o login no histórico
    if (user) {
      navigate("/menu", { replace: true });
    }
  }, [user, navigate]);

  // Ninguém logado: mostra a página que está dentro (Login ou Cadastro)
  return <>{children}</>;
};

export default PublicRoute;