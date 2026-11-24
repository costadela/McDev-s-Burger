// Script que roda UMA VEZ para colocar os produtos iniciais no banco
import { prisma } from "../src/db.ts"; // o mesmo prisma que o controller usa

// Os produtos que antes ficavam fixos no front, agora no formato do banco
const products = [
  // BURGUERS
  { name: "McBug", category: "Burguers", price: 19.9, imageUrl: "/images/mcbug.jpg",
    description: "Burger artesanal, cheddar, alface, tomate e molho especial da casa. O clássico que nunca dá erro." },
  { name: "Bug Duplo", category: "Burguers", price: 27.9, imageUrl: "/images/bug-duplo.jpg",
    description: "Dois burgers artesanais, cheddar duplo, cebola caramelizada e molho especial. Dobro de sabor, zero bugs." },
  { name: "Full Stack", category: "Burguers", price: 29.9, imageUrl: "/images/full-stack.jpg",
    description: "Burger artesanal, cheddar, bacon crocante, alface, tomate e molho barbecue. Completo em todas as camadas." },
  { name: "Deploy de Frango", category: "Burguers", price: 23.9, imageUrl: "/images/deploy-frango.jpg",
    description: "Frango empanado crocante, queijo, alface e maionese temperada. Pronto para produção." },
  { name: "Commit Bacon", category: "Burguers", price: 26.9, imageUrl: "/images/commit-bacon.jpg",
    description: "Burger artesanal, bacon crocante, cheddar cremoso e molho especial. Uma combinação aprovada e enviada para produção." },

  // COMBOS
  { name: "McBug Combo", category: "Combos", price: 29.9, imageUrl: "/images/mcbug-combo.jpg",
    description: "McBug, batata frita individual e Coca-Cola lata." },
  { name: "Full Stack Combo", category: "Combos", price: 39.9, imageUrl: "/images/full-stack-combo.jpg",
    description: "Full Stack, batata frita individual e refrigerante lata." },
  { name: "Bug Duplo Combo", category: "Combos", price: 37.9, imageUrl: "/images/bug-duplo-combo.jpg",
    description: "Bug Duplo, batata frita individual e Coca-Cola lata." },

  // PORÇÕES
  { name: "Bug Rings", category: "Porções", price: 19.0, imageUrl: "/images/bug-rings.jpg",
    description: "Anéis de cebola empanados e crocantes. Pequenos bugs impossíveis de resistir." },
  { name: "Overflow Fries", category: "Porções", price: 27.0, imageUrl: "/images/overflow-fries.jpg",
    description: "Batatas fritas cobertas com cheddar cremoso e bacon crocante. Excesso de sabor permitido." },
  { name: "Nuggets de Código", category: "Porções", price: 17.0, imageUrl: "/images/nuggets-codigo.jpg",
    description: "Nuggets de frango crocantes acompanhados de molho especial da casa." },

  // BEBIDAS
  { name: "Coca-Cola", category: "Bebidas", price: 6.0, imageUrl: "/images/coca-cola.jpg",
    description: "Refrigerante Coca-Cola gelado, lata 350ml." },
  { name: "Guaraná Antarctica", category: "Bebidas", price: 5.5, imageUrl: "/images/guarana.jpg",
    description: "Refrigerante Guaraná Antarctica, lata 350ml." },
  { name: "Suco de Laranja", category: "Bebidas", price: 8.0, imageUrl: "/images/suco-laranja.jpg",
    description: "Suco natural de laranja, preparado na hora." },
  { name: "Água Mineral", category: "Bebidas", price: 3.5, imageUrl: "/images/agua.jpg",
    description: "Água mineral sem gás, garrafa 500ml." },

  // SOBREMESAS
  { name: "Chocolate Overflow", category: "Sobremesas", price: 12.0, imageUrl: "/images/chocolate-overflow.jpg",
    description: "Brownie de chocolate com casquinha crocante, interior macio e cobertura de chocolate." },
  { name: "Cookie.exe", category: "Sobremesas", price: 9.0, imageUrl: "/images/cookie-exe.jpg",
    description: "Cookie artesanal com gotas de chocolate, crocante por fora e macio por dentro. Um arquivo impossível de fechar." },
  { name: "Loop de Churros", category: "Sobremesas", price: 10.0, imageUrl: "/images/loop-churros.jpg",
    description: "Churros crocantes recheados com doce de leite, açúcar e canela. Impossível parar no primeiro." },
];

const main = async () => {
  // Proteção: se já tem produto no banco, não cadastra de novo (evita duplicar)
  const count = await prisma.product.count();
  if (count > 0) {
    console.log(`Já existem ${count} produtos no banco. Seed ignorado.`);
    return;
  }

  // createMany: cadastra todos de uma vez
  // Não passamos id, available nem createdAt: o banco preenche sozinho (@default)
  const result = await prisma.product.createMany({ data: products });
  console.log(`${result.count} produtos cadastrados!`);
};

main()
  .catch((error) => console.error("Erro no seed:", error))
  .finally(() => prisma.$disconnect()); // fecha a conexão com o banco no fim