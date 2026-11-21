import type { Order } from "../types/Order";

// Pedidos de exemplo por enquanto; depois vamos buscar do backend
const orders: Order[] = [
  { id: 1, customerName: "Vitor Costa", date: "20/11/2026", orderTime: "19:30",  total: 47.8, status: "pendente" },
  { id: 2, customerName: "Ana Souza", date: "20/11/2026", orderTime: "19:45", total: 29.9, status: "pendente" },
  { id: 3, customerName: "Carlos Lima", date: "20/11/2026", orderTime: "20:05",  total: 63.7, status: "pendente" },
  { id: 4, customerName: "Juliana Alves", date: "20/11/2026", orderTime: "18:50", deliveryTime: "19:30", total: 37.9, status: "retirado" },
  { id: 5, customerName: "Pedro Rocha", date: "20/11/2026", orderTime: "18:20",  total: 19.9, status: "cancelado" },
];

export default orders;