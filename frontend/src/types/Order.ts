export type OrderStatus = "pendente" | "retirado" | "cancelado";

export type Order = {
  id: number;
  customerName: string;
  date: string;
  orderTime: string;
  deliveryTime?: string; 
  total: number;
  status: OrderStatus;
};