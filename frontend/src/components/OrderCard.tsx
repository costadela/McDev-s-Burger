import { User, Calendar, Clock } from "lucide-react";
import type { Order, OrderStatus } from "../types/Order";

type OrderCardProps = {
  order: Order;
  onChangeStatus: (orderId: number, newStatus: OrderStatus) => void;
};

const OrderCard = ({ order, onChangeStatus }: OrderCardProps) => {
  return (
    <div className="rounded-lg bg-amber-50 p-3 text-neutral-900">
      {/* número do pedido e select de status */}
      <div className="flex items-center justify-between">
        <span className="text-sm font-bold">Pedido #{order.id}</span>

        <select
          value={order.status}
          onChange={(e) => onChangeStatus(order.id, e.target.value as OrderStatus)}
          className="cursor-pointer rounded-md bg-transparent text-xs font-bold"
        >
          <option value="pendente" disabled>
            Pendente
          </option>
          <option value="retirado">Retirado</option>
          <option value="cancelado">Cancelado</option>
        </select>
      </div>

      {/* Informações do pedido */}
      <div className="mt-2 flex flex-col gap-1 text-xs">
        <div className="flex items-center gap-2">
          <User size={14} />
          <span>{order.customerName}</span>
        </div>

        <div className="flex items-center gap-2">
          <Calendar size={14} />
          <span>{order.date}</span>
        </div>

        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <Clock size={14} />
            <span>Pedido: {order.orderTime}</span>
          </div>
          <div className="flex items-center gap-2">
            <Clock size={14} />
            <span>Entrega: {order.deliveryTime ?? "—"}</span>
          </div>
        </div>
      </div>

      {/* Linha divisória */}
      <div className="mt-2 h-0.5 w-full bg-neutral-900/20" />

      {/* Total */}
      <p className="mt-2 text-right text-lg font-bold">
        {order.total.toLocaleString("pt-BR", { style: "currency", currency: "BRL" })}
      </p>
    </div>
  );
};

export default OrderCard;