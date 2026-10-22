export type Product = {
  id: number;
  name: string;
  description: string;
  price: number;
  image: string;
};

const Products: Product[] = [
  {
    id: 1,
    name: "McBug",
    description: "Um clássico sem bugs: pão macio, burger suculento, queijo derretido, alface e tomate.",
    price: 15.99,
    image: "/images/x-burger.jpg",
  },
  {
    id: 2,
    name: "McStack",
    description: "As melhores camadas do código... e do sabor: burger, queijo, salada fresca e molho especial.",
    price: 17.99,
    image: "/images/x-salada.jpg",
  },
  {
    id: 3,
    name: "McBacon++",
    description: "Upgrade de sabor desbloqueado: burger suculento, bacon crocante e queijo derretido.",
    price: 19.99,
    image: "/images/x-bacon.jpg",
  },
];

export default Products;