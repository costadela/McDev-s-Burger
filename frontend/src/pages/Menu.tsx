import { useState } from "react";
import Products from "../components/Products"; // Componente: desenha os cards
import products from "../data/products"; // Dados: a lista de produtos
import categories from "../data/categories"; // Dados: a lista de categorias

const Menu = () => {
  // Guarda qual categoria está selecionada (começa no Hamburger)
  const [selectedCategory, setSelectedCategory] = useState(1);

  // Só os produtos da categoria clicada 
  const filteredProducts = products.filter(
    (product) => product.categoryId === selectedCategory
  );

  // Troca a categoria selecionada
  const handleChangeCategory = (categoryId: number) => {
    setSelectedCategory(categoryId);
  };

  // Devolve a classe conforme estiver selecionada ou não
  const getCategoryClass = (categoryId: number) => {
    const baseClass =
  "flex h-7 w-[31%] cursor-pointer items-center justify-center rounded-md border border-amber-50 text-xs font-bold transition md:h-9 md:w-32 md:text-base";

    if (categoryId === selectedCategory) {
      return `${baseClass} bg-amber-50 text-neutral-900`; // Selecionada
    }
    return `${baseClass} bg-neutral-900 text-amber-50 hover:bg-amber-50 hover:text-neutral-900`; // Não selecionada
  };

  return (
    <div className="flex min-h-screen w-full flex-col items-center bg-black px-6 py-8 text-white md:px-12">
      {/* Título da página */}
      <h1 className="text-3xl font-extrabold tracking-tight md:text-4xl">
        Nosso <span className="text-[#ffa41b]">cardápio</span>
      </h1>

 {/* Categorias */}
<div className="mt-6 flex w-full max-w-80 flex-wrap justify-center gap-2 md:max-w-none">
        {categories.map((category) => (
          <button
            key={category.id}
            type="button"
            onClick={() => handleChangeCategory(category.id)}
            className={getCategoryClass(category.id)}
          >
            {category.name}
          </button>
        ))}
      </div>

      {/* Produtos da categoria selecionada */}
      <Products products={filteredProducts} />
    </div>
  );
};

export default Menu;