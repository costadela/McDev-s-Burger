import { createContext, useEffect, useState, type ReactNode } from "react";
import type { UserContextType, UserInterface } from "../types/User";

export const UserContext = createContext<UserContextType>({
  user: null,
  setUser: () => {},
});

export const UserProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<UserInterface | null>(null);

  // Ao abrir o site (em qualquer página), pergunta ao back se o cookie ainda é válido
  useEffect(() => {
    const handleAuthUser = async () => {
      try {
        const response = await fetch(`${import.meta.env.VITE_API_URL}/me`, {
          credentials: "include",
        });

        if (response.status !== 200) {
          setUser(null);
          return;
        }

        const data = await response.json();
        setUser(data); // { id, name, email, cep, admin }
      } catch (error) {
        console.error("Erro ao verificar usuário:", error);
        setUser(null);
      }
    };

    handleAuthUser();
  }, []);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};