import { useContext } from "react";
import { ShoppingCart } from "lucide-react";
import { UserContext } from "../contexts/UserContext";
import type { Product } from "../types/Product";
import { formatPrice } from "../utils/formatPrice";

// Diz ao TypeScript o que este componente recebe do Menu
type ProductsProps = {
  products: Product[];
};

const Products = ({ products }: ProductsProps) => {
  const { user } = useContext(UserContext);

  // Por enquanto só mostra no console: a lógica do carrinho vem depois
  const handleAddToCart = (product: Product) => {
    console.log("Adicionar ao carrinho:", product.name);
  };

  return (
    // Lista em uma coluna, também no desktop
    <div className="mt-8 flex w-full max-w-3xl flex-col gap-3">
      {products.map((product) => (
        <div key={product.id} className="flex gap-3 rounded-xl bg-neutral-900 p-3 md:gap-4">
          {/* Foto: mesma altura da coluna de texto */}
          <img
  src={product.imageUrl ?? ""}
            alt={product.name}
            className="h-24 w-24 shrink-0 rounded-lg object-cover md:h-28 md:w-28"
          />

          {/* Texto: mesma altura da foto, com nome em cima e preço embaixo */}
          <div className="flex h-24 min-w-0 flex-1 flex-col justify-between md:h-28">
            <div>
              <h2 className="text-sm font-bold md:text-base">{product.name}</h2>
              {/* line-clamp-2: no máximo 2 linhas, o resto vira "..." */}
              <p className="line-clamp-2 text-xs text-neutral-400 md:text-sm">
                {product.description}
              </p>
            </div>

            <div className="flex items-center justify-between">
<span className="text-sm font-bold text-[#ffa41b] md:text-base">
  {formatPrice(product.price)}
</span>

              {/* Adicionar ao carrinho: só para cliente, admin não compra */}
              {!user?.admin && (
                <button
                  type="button"
                  onClick={() => handleAddToCart(product)}
                  className="flex h-8 w-8 cursor-pointer items-center justify-center rounded-full bg-[#ffa41b] text-black transition hover:scale-110"
                  aria-label={`Adicionar ${product.name} ao carrinho`}
                >
                  <ShoppingCart size={16} />
                </button>
              )}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Products;