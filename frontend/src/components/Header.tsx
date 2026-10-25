import { Link } from "react-router-dom";

const Header = () => {
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

        {/* Navegação e ações */}
        <nav className="flex items-center gap-3">
          <Link
            to="/menu"
            className="inline-flex items-center justify-center rounded-xl border border-neutral-700 px-5 py-2.5 text-sm font-bold text-white transition duration-200 hover:-translate-y-0.5 hover:border-[#ffa41b] hover:text-[#ffa41b]"
          >
            Ver cardápio →
          </Link>

          <Link
            to="/login"
            className="inline-flex items-center justify-center rounded-xl bg-linear-to-br from-[#ffa41b] to-[#ff7a00] px-5 py-2.5 text-sm font-bold text-neutral-900 shadow-[0_8px_30px_rgba(255,140,0,0.25)] transition duration-200 hover:-translate-y-0.5 hover:shadow-[0_12px_40px_rgba(255,140,0,0.45)] active:scale-95"
          >
            Entrar
          </Link>
        </nav>
      </div>
    </header>
  );
};

export default Header;
