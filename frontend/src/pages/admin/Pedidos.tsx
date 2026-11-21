import { useState } from "react";
import initialOrders from "../../data/orders";
import type { OrderStatus } from "../../types/Order";
import OrderCard from "../../components/OrderCard";

// Os filtros da página
const statuses: { value: OrderStatus; label: string }[] = [
  { value: "pendente", label: "Pendentes" },
  { value: "retirado", label: "Retirados" },
  { value: "cancelado", label: "Cancelados" },
];

const Pedidos = () => {
  // Os pedidos ficam num estado porque o status deles muda pelo select
  const [orders, setOrders] = useState(initialOrders);

  // Qual filtro está selecionado 
  const [selectedStatus, setSelectedStatus] = useState<OrderStatus>("pendente");

  // Só os pedidos do status selecionado
  const filteredOrders = orders.filter((order) => order.status === selectedStatus);

// Muda o status de um pedido; se for retirado, registra o horário de agora
const handleChangeOrderStatus = (orderId: number, newStatus: OrderStatus) => {
  const now = new Date().toLocaleTimeString("pt-BR", { hour: "2-digit", minute: "2-digit" });

  setOrders((currentOrders) =>
    currentOrders.map((order) =>
      order.id === orderId
        ? {
            ...order,
            status: newStatus,
            deliveryTime: newStatus === "retirado" ? now : order.deliveryTime,
          }
        : order
    )
  );
};

  // Mesma ideia do getCategoryClass do Menu
  const getStatusClass = (status: OrderStatus) => {
    const baseClass =
      "flex h-7 w-[31%] cursor-pointer items-center justify-center rounded-md border border-amber-50 text-xs font-bold transition md:h-9 md:w-32 md:text-base";

    if (status === selectedStatus) {
      return `${baseClass} bg-amber-50 text-neutral-900`; // Selecionado
    }
    return `${baseClass} bg-neutral-900 text-amber-50 hover:bg-amber-50 hover:text-neutral-900`; // Não selecionado
  };

  return (
    <div className="flex min-h-screen w-full flex-col items-center bg-black px-6 py-8 text-white md:px-12">
      {/* Título da página */}
      <h1 className="text-3xl font-extrabold tracking-tight md:text-4xl">
        Nossos <span className="text-[#ffa41b]">Pedidos</span>
      </h1>

      {/* Filtros de status */}
      <div className="mt-6 flex w-full max-w-80 flex-wrap justify-center gap-2 md:max-w-none">
        {statuses.map((status) => (
          <button
            key={status.value}
            type="button"
            onClick={() => setSelectedStatus(status.value)}
            className={getStatusClass(status.value)}
          >
            {status.label}
          </button>
        ))}
      </div>

      {/* Cards: 1 coluna no celular, 2 no tablet, 3 no desktop */}
      <div className="mt-8 grid w-full max-w-300 gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {filteredOrders.map((order) => (
          <OrderCard key={order.id} order={order} onChangeStatus={handleChangeOrderStatus} />
        ))}

        {/* Mensagem quando o filtro não tem nenhum pedido */}
        {filteredOrders.length === 0 && (
          <p className="col-span-full text-center text-sm text-neutral-400">
            Nenhum pedido aqui.
          </p>
        )}
      </div>
    </div>
  );
};

export default Pedidos;