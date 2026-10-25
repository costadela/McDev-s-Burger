import { createBrowserRouter, Outlet } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Menu from "./pages/Menu";

/**
 * LAYOUT PADRÃO (Com Header e Footer)
 * Renderiza a estrutura fixa da aplicação.
 * O componente <Outlet /> é a "janela" onde as páginas filhas (children) serão exibidas.
 */
const Layout = () => {
  return (
    <div className="flex min-h-screen w-full flex-col bg-black text-white">
      <Header />
      <main className="flex-1">
        <Outlet /> {/* As rotas com layout renderizam aqui */}
      </main>
      <Footer />
    </div>
  );
};

export const router = createBrowserRouter([
  // ==========================================
  // ROTAS COM LAYOUT (Exibem Header e Footer)
  // ==========================================
  {
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
    ],
  },

  // ==========================================
  // ROTAS SEM LAYOUT (Tela cheia / Limpas)
  // Útil para Login/Cadastro para não ter Header/Footer atrapalhando
  // ==========================================
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/cadastro",
    element: <Register />,
  },
        {
        path: "/menu",
        element: <Menu />,
      },
]);
