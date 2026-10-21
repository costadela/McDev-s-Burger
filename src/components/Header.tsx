import { Link } from "react-router-dom";

const Header = () => {
  return (
    <header className="border-b border-neutral-800 bg-black px-6 py-4 text-white md:px-12">
      <div className="mx-auto flex max-w-6xl items-center justify-between">
        {/* Logo clicável apontando para a Home */}
        <Link
          to="/"
          className="flex items-center gap-2 transition-opacity hover:opacity-90"
        >
          <img src="/logo.png" alt="McDev's Burger" className="h-16 w-auto" />
        </Link>

        {/* Navegação e Ações */}
        <nav className="flex items-center gap-6">
          <Link
            to="/"
            className="text-sm font-medium text-neutral-300 transition-colors hover:text-white"
          >
            Cardápio
          </Link>

          {/* Link estilizado como botão */}
          <Link
            to="/login"
            className="rounded-md bg-blue-600 px-4 py-2 text-sm font-bold text-white transition-colors hover:bg-blue-700 active:scale-95"
          >
            Entrar
          </Link>
        </nav>
      </div>
    </header>
  );
};

export default Header;
