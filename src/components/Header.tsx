const Header = () => {
  return (
    <header className="bg-black text-white py-4 px-6 md:px-12">
      <div className="flex items-center justify-between">
        <img src="/logo.png" alt="Logo da Empresa" className="h-20 w-auto" />
        <button
          type="button"
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded transition-colors"
        >
          Entrar
        </button>
      </div>
    </header>
  );
};

export default Header;
