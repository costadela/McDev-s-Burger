import type { Product } from "../types/Product";

const products: Product[] = [
  // BURGUERS (categoryId 1)
  {
    id: 1,
    categoryId: 1,
    name: "McBug",
    description:
      "Burger artesanal, cheddar, alface, tomate e molho especial da casa. O clássico que nunca dá erro.",
    price: 19.9,
    image: "/images/mcbug.jpg",
  },
  {
    id: 2,
    categoryId: 1,
    name: "Bug Duplo",
    description:
      "Dois burgers artesanais, cheddar duplo, cebola caramelizada e molho especial. Dobro de sabor, zero bugs.",
    price: 27.9,
    image: "/images/bug-duplo.jpg",
  },
  {
    id: 3,
    categoryId: 1,
    name: "Full Stack",
    description:
      "Burger artesanal, cheddar, bacon crocante, alface, tomate e molho barbecue. Completo em todas as camadas.",
    price: 29.9,
    image: "/images/full-stack.jpg",
  },
  {
    id: 4,
    categoryId: 1,
    name: "Deploy de Frango",
    description:
      "Frango empanado crocante, queijo, alface e maionese temperada. Pronto para produção.",
    price: 23.9,
    image: "/images/deploy-frango.jpg",
  },
  {
    id: 5,
    categoryId: 1,
    name: "Commit Bacon",
    description:
      "Burger artesanal, bacon crocante, cheddar cremoso e molho especial. Uma combinação aprovada e enviada para produção.",
    price: 26.9,
    image: "/images/commit-bacon.jpg",
  },

  // COMBOS (categoryId 4)
  {
    id: 6,
    categoryId: 4,
    name: "McBug Combo",
    description: "McBug, batata frita individual e Coca-Cola lata.",
    price: 29.9,
    image: "/images/mcbug-combo.jpg",
  },
  {
    id: 7,
    categoryId: 4,
    name: "Full Stack Combo",
    description: "Full Stack, batata frita individual e refrigerante lata.",
    price: 39.9,
    image: "/images/full-stack-combo.jpg",
  },
  {
    id: 8,
    categoryId: 4,
    name: "Bug Duplo Combo",
    description: "Bug Duplo, batata frita individual e Coca-Cola lata.",
    price: 37.9,
    image: "/images/bug-duplo-combo.jpg",
  },

  // PORÇÕES (categoryId 3)
  {
    id: 9,
    categoryId: 3,
    name: "Bug Rings",
    description:
      "Anéis de cebola empanados e crocantes. Pequenos bugs impossíveis de resistir.",
    price: 19.0,
    image: "/images/bug-rings.jpg",
  },
  {
    id: 10,
    categoryId: 3,
    name: "Overflow Fries",
    description:
      "Batatas fritas cobertas com cheddar cremoso e bacon crocante. Excesso de sabor permitido.",
    price: 27.0,
    image: "/images/overflow-fries.jpg",
  },
  {
    id: 11,
    categoryId: 3,
    name: "Nuggets de Código",
    description:
      "Nuggets de frango crocantes acompanhados de molho especial da casa.",
    price: 17.0,
    image: "/images/nuggets-codigo.jpg",
  },

  // BEBIDAS (categoryId 2)
  {
    id: 12,
    categoryId: 2,
    name: "Coca-Cola",
    description: "Refrigerante Coca-Cola gelado, lata 350ml.",
    price: 6.0,
    image: "/images/coca-cola.jpg",
  },
  {
    id: 13,
    categoryId: 2,
    name: "Guaraná Antarctica",
    description: "Refrigerante Guaraná Antarctica, lata 350ml.",
    price: 5.5,
    image: "/images/guarana.jpg",
  },
  {
    id: 14,
    categoryId: 2,
    name: "Suco de Laranja",
    description: "Suco natural de laranja, preparado na hora.",
    price: 8.0,
    image: "/images/suco-laranja.jpg",
  },
  {
    id: 15,
    categoryId: 2,
    name: "Água Mineral",
    description: "Água mineral sem gás, garrafa 500ml.",
    price: 3.5,
    image: "/images/agua.jpg",
  },

  // SOBREMESAS (categoryId 5)
  {
    id: 16,
    categoryId: 5,
    name: "Chocolate Overflow",
    description:
      "Brownie de chocolate com casquinha crocante, interior macio e cobertura de chocolate.",
    price: 12.0,
    image: "/images/chocolate-overflow.jpg",
  },
  {
    id: 17,
    categoryId: 5,
    name: "Cookie.exe",
    description:
      "Cookie artesanal com gotas de chocolate, crocante por fora e macio por dentro. Um arquivo impossível de fechar.",
    price: 9.0,
    image: "/images/cookie-exe.jpg",
  },
  {
    id: 18,
    categoryId: 5,
    name: "Loop de Churros",
    description:
      "Churros crocantes recheados com doce de leite, açúcar e canela. Impossível parar no primeiro.",
    price: 10.0,
    image: "/images/loop-churros.jpg",
  },
];

export default products;