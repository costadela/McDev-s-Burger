// Cria o formatador UMA vez (é mais leve do que criar um a cada card)
const priceFormatter = new Intl.NumberFormat("pt-BR", {
  style: "currency",
  currency: "BRL",
});

// Aceita número ou texto, porque o Decimal do banco chega como "19.9"
export const formatPrice = (value: number | string) =>
  priceFormatter.format(Number(value));