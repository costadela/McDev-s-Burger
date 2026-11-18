import Products from "../components/Products";

const formatPrice = (value: number) =>
  value.toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
  });

const Menu = () => {
  return (
    <>

      <div className="flex min-h-screen w-full flex-col items-center bg-black px-6 py-8 text-white md:px-12">
        <h1 className="text-3xl font-extrabold tracking-tight md:text-4xl">
          Card<span className="text-[#ffa41b]">á</span>pio
        </h1>

        <p className="mt-2 text-center text-neutral-400">
          Escolha seu próximo commit de sabor.
        </p>

        <p className="mt-1 text-sm text-neutral-500">
          100% artesanal. Zero bugs.
        </p>

        {/* Produtos */}
        <section className="mt-10 flex w-full max-w-300 flex-wrap justify-center gap-5">
          {Products.map((product) => (
            <article
              key={product.id}
              className="flex w-full max-w-xs flex-col overflow-hidden rounded-2xl border border-neutral-800 bg-neutral-950 transition duration-200 hover:-translate-y-1 hover:border-[#ffa41b] md:w-64"
            >
              <img
                src={product.image}
                alt={product.name}
                onError={(e) => {
                  e.currentTarget.onerror = null;
                  e.currentTarget.src = "/hero-burger.png";
                }}
                className="h-44 w-full object-cover"
              />

              <div className="flex flex-1 flex-col p-5">
                <h2 className="text-lg font-semibold">{product.name}</h2>

                <p className="mt-1.5 flex-1 text-[0.95rem] leading-normal text-neutral-400">
                  {product.description}
                </p>

                <div className="mt-4 flex items-center justify-between">
                  <span className="text-lg font-bold text-[#ffa41b]">
                    {formatPrice(product.price)}
                  </span>
                </div>
              </div>
            </article>
          ))}
        </section>
      </div>
    </>
  );
};

export default Menu;