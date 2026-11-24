import { useState, useEffect } from "react";
import Products from "../components/Products";
import categories from "../data/categories";
import type { Product } from "../types/Product"; // 🆕 (o import do data/products saiu)

const Menu = () => {
  const [selectedCategory, setSelectedCategory] = useState(1);

  // 🆕 Guarda os produtos que vêm do banco. Começa vazio: [] até a resposta chegar
  const [products, setProducts] = useState<Product[]>([]);

  // 🆕 Busca os produtos na rota do back
  const getProducts = async () => {
    try {
    const response = await fetch(`${import.meta.env.VITE_API_URL}/products`);
      if (!response.ok) {
        throw new Error("Erro ao buscar produtos");
      }
      const data: Product[] = await response.json();
      setProducts(data); // guarda no estado e a tela re-renderiza com os produtos
    } catch (error) {
      console.error(error);
    }
  };

  // 🆕 Roda getProducts UMA vez, quando a página carrega
  // O [] no final é o que impede o loop infinito que travou o PC do professor
  useEffect(() => {
    getProducts();
  }, []);

  // Descobre o NOME da categoria selecionada (ex: 1 → "Burguers")
  const selectedCategoryName = categories.find(
    (category) => category.id === selectedCategory
  )?.name;

  // Filtra comparando com o campo category do banco
  const filteredProducts = products.filter(
    (product) => product.category === selectedCategoryName
  );

  const handleChangeCategory = (categoryId: number) => {
    setSelectedCategory(categoryId);
  };

  const getCategoryClass = (categoryId: number) => {
    const baseClass =
      "flex h-7 w-[31%] cursor-pointer items-center justify-center rounded-md border border-amber-50 text-xs font-bold transition md:h-9 md:w-32 md:text-base";

    if (categoryId === selectedCategory) {
      return `${baseClass} bg-amber-50 text-neutral-900`;
    }
    return `${baseClass} bg-neutral-900 text-amber-50 hover:bg-amber-50 hover:text-neutral-900`;
  };

  return (
    <div className="flex min-h-screen w-full flex-col items-center bg-black px-6 py-8 text-white md:px-12">
      <h1 className="text-3xl font-extrabold tracking-tight md:text-4xl">
        Nosso <span className="text-[#ffa41b]">cardápio</span>
      </h1>

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

            {/* Se o filtro não encontrou nada, avisa em vez de mostrar tela vazia */}
      {filteredProducts.length === 0 ? (
        <p className="mt-8 text-neutral-400">Não há produtos nesta categoria.</p>
      ) : (
        <Products products={filteredProducts} />
      )}
    </div>
  );
};

export default Menu;