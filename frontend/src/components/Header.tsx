import { Link, useLocation, useNavigate } from "react-router-dom";
import { useContext } from "react";
import { UserContext } from "../contexts/UserContext";
import { LogOut, ShoppingCart, LayoutDashboard, Plus, Box } from "lucide-react";

const Header = () => {
  const { user, setUser } = useContext(UserContext);
  const location = useLocation();
  const navigate = useNavigate();

  const isOnMenu = location.pathname === "/menu";

  // Pede ao back para apagar o cookie e depois limpa o front
  async function handleLogout() {
    try {
      await fetch(`${import.meta.env.VITE_API_URL}/logout`, {
        method: "POST",
        credentials: "include",
      });
    } catch (error) {
      console.error("Erro ao sair:", error);
    } finally {
      setUser(null);
      navigate("/");
    }
  }

  // Destaca o ícone da página atual (menor no celular)
  function getNavClass(path: string) {
    const baseClass =
      "flex h-8 w-8 cursor-pointer items-center justify-center rounded-full transition hover:scale-110 md:h-9 md:w-9";

    if (location.pathname === path) {
      return `${baseClass} bg-[#ffa41b] text-black`;
    } else {
      return `${baseClass} bg-neutral-800 text-white`;
    }
  }

  return (
    <header className="border-b border-neutral-800 bg-black text-white">
      <div className="mx-auto flex w-full max-w-300 items-center justify-between px-4 py-3 md:px-12">
        {/* Logo clicável apontando para a Home */}
        <Link
          to="/"
          className="flex items-center gap-2 transition-opacity hover:opacity-90"
        >
          <img
            src="/logo.png"
            alt="McDev's Burger"
            className="h-12 w-auto shrink-0 md:h-20"
          />
        </Link>

        <div className="flex items-center gap-2 text-white md:gap-4">
          {/* Ícones de administração: só para admin */}
          {user && user.admin && (
            <div className="flex items-center gap-2 md:gap-3">
              <Link
                to="/admin/cardapio"
                className={getNavClass("/admin/cardapio")}
                title="Cardápio editável"
              >
                <Box size={16} />
              </Link>

              <Link
                to="/admin/pedidos"
                className={getNavClass("/admin/pedidos")}
                title="Pedidos"
              >
                <LayoutDashboard size={16} />
              </Link>

              {/* Vai abrir um modal (mais para frente), por isso é botão e não link */}
              <button className={getNavClass("")} title="Adicionar produto">
                <Plus size={16} />
              </button>
            </div>
          )}

          {/* Navegação e ações */}
          <nav className="flex items-center gap-2 md:gap-4">
            {!isOnMenu && (
              <Link
                to="/menu"
                className="inline-flex items-center justify-center rounded-lg border border-neutral-700 px-3 py-1.5 text-xs font-bold text-white transition duration-200 hover:-translate-y-0.5 hover:border-[#ffa41b] hover:text-[#ffa41b] md:rounded-xl md:px-5 md:py-2.5 md:text-sm"
              >
                {/* No celular só "Cardápio"; no desktop o texto completo */}
                <span className="md:hidden">Cardápio</span>
                <span className="hidden md:inline">Ver cardápio →</span>
              </Link>
            )}

            {user ? (
              <>
                {/* Carrinho: só para cliente, admin não compra */}
                {!user.admin && (
                  <button
                    className="relative cursor-pointer p-1.5 text-white transition hover:text-[#ffa41b] md:p-2"
                    aria-label="Carrinho"
                  >
                    <ShoppingCart size={20} />
                    <span className="absolute -top-1 -right-1 flex h-4.5 min-w-4.5 items-center justify-center rounded-full bg-[#ffa41b] px-1 text-[11px] font-bold text-black ring-2 ring-black">
                      1
                    </span>
                  </button>
                )}

                <span className="text-xs font-bold md:text-sm">
                  Olá, {user.name.split(" ")[0]}!
                </span>

                {/* Sair */}
                <button
                  onClick={handleLogout}
                  className="flex cursor-pointer items-center gap-1 text-sm text-neutral-400 transition hover:text-[#ffa41b]"
                  aria-label="Sair"
                >
                  <LogOut size={18} />
                  <span className="hidden md:inline">Sair</span>
                </button>
              </>
            ) : (
              <Link
                to="/login"
                className="inline-flex items-center justify-center rounded-lg bg-linear-to-br from-[#ffa41b] to-[#ff7a00] px-4 py-1.5 text-xs font-bold text-neutral-900 shadow-[0_8px_30px_rgba(255,140,0,0.25)] transition duration-200 hover:-translate-y-0.5 hover:shadow-[0_12px_40px_rgba(255,140,0,0.45)] active:scale-95 md:rounded-xl md:px-5 md:py-2.5 md:text-sm"
              >
                Entrar
              </Link>
            )}
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;