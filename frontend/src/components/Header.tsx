import { Link, useLocation, useNavigate } from "react-router-dom";
import { useContext, useEffect } from "react";
import { UserContext } from "../contexts/UserContext";
import { LogOut, ShoppingCart, LayoutDashboard, Plus, Box } from "lucide-react";

const Header = () => {
  const { user, setUser } = useContext(UserContext);
  const location = useLocation();
  const navigate = useNavigate();

  const isOnMenu = location.pathname === "/menu";

  // Ao carregar o Header, pergunta ao back se o cookie ainda é válido
  useEffect(() => {
    const handleAuthUser = async () => {
      try {
        const response = await fetch("http://localhost:3000/me", {
          credentials: "include",
        });

        if (response.status !== 200) {
          setUser(null);
          return;
        }

        const data = await response.json();
        setUser(data); // { id, name, email, cep }
      } catch (error) {
        console.error("Erro ao verificar usuário:", error);
        setUser(null);
      }
    };

    handleAuthUser();
  }, []);

  // Pede ao back para apagar o cookie e depois limpa o front
  async function handleLogout() {
    try {
      await fetch("http://localhost:3000/logout", {
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

  // Destaca o ícone da página atual
  function getNavClass(path: string) {
    const baseClass =
      "flex h-[35px] w-[35px] items-center justify-center rounded-full transition hover:scale-110";

    if (location.pathname === path) {
      return `${baseClass} bg-[#ffa41b] text-black`;
    } else {
      return `${baseClass} bg-neutral-800 text-white`;
    }
  }

  return (
    <header className="border-b border-neutral-800 bg-black text-white">
      <div className="mx-auto flex w-full max-w-300 items-center justify-between px-6 py-3 md:px-12">
        {/* Logo clicável apontando para a Home */}
        <Link
          to="/"
          className="flex items-center gap-2 transition-opacity hover:opacity-90"
        >
          <img src="/logo.png" alt="McDev's Burger" className="h-20 w-auto" />
        </Link>

        <div className="flex items-center gap-4 text-white">
          {/* Ícones de administração: só para usuário logado */}
          {user && (
            <div className="flex items-center gap-3">
              <Link
                to="/admin/cardapio"
                className={getNavClass("/admin/cardapio")}
                title="Cardápio editável"
              >
                <Box size={18} />
              </Link>

              <Link
                to="/admin/pedidos"
                className={getNavClass("/admin/pedidos")}
                title="Pedidos"
              >
                <LayoutDashboard size={18} />
              </Link>

              {/* Vai abrir um modal (mais para frente), por isso é botão e não link */}
              <button
                className="flex h-8.75 w-8.75 cursor-pointer items-center justify-center rounded-full bg-neutral-800 text-white transition hover:scale-110"
                title="Adicionar produto"
              >
                <Plus size={18} />
              </button>
            </div>
          )}

          {/* Navegação e ações */}
          <nav className="flex items-center gap-4">
            {!isOnMenu && (
              <Link
                to="/menu"
                className="inline-flex items-center justify-center rounded-xl border border-neutral-700 px-5 py-2.5 text-sm font-bold text-white transition duration-200 hover:-translate-y-0.5 hover:border-[#ffa41b] hover:text-[#ffa41b]"
              >
                Ver cardápio →
              </Link>
            )}

            {user ? (
              <>
                {/* Carrinho */}
                <button
                  className="relative cursor-pointer p-2 text-white transition hover:text-[#ffa41b]"
                  aria-label="Carrinho"
                >
                  <ShoppingCart size={22} />
                  <span className="absolute -top-1 -right-1 flex h-4.5 min-w-4.5 items-center justify-center rounded-full bg-[#ffa41b] px-1 text-[11px] font-bold text-black ring-2 ring-black">
                    1
                  </span>
                </button>

                <span className="text-sm font-bold">Olá, {user.name}!</span>

                {/* Sair */}
                <button
                  onClick={handleLogout}
                  className="flex cursor-pointer items-center gap-1 text-sm text-neutral-400 transition hover:text-[#ffa41b]"
                >
                  <LogOut size={20} />
                  Sair
                </button>
              </>
            ) : (
              <Link
                to="/login"
                className="inline-flex items-center justify-center rounded-xl bg-linear-to-br from-[#ffa41b] to-[#ff7a00] px-5 py-2.5 text-sm font-bold text-neutral-900 shadow-[0_8px_30px_rgba(255,140,0,0.25)] transition duration-200 hover:-translate-y-0.5 hover:shadow-[0_12px_40px_rgba(255,140,0,0.45)] active:scale-95"
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