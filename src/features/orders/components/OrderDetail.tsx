import type { Order } from '../types/orders.types'
import { Badge } from '@rangeldor/cindle-design-system'

interface OrderDetailProps {
  order: Order
}

const statusColors = {
  pending: 'bg-yellow-100 text-yellow-800',
  processing: 'bg-blue-100 text-blue-800',
  shipped: 'bg-purple-100 text-purple-800',
  delivered: 'bg-green-100 text-green-800',
  cancelled: 'bg-red-100 text-red-800',
}

const statusLabels = {
  pending: 'Pendente',
  processing: 'Processando',
  shipped: 'Enviado',
  delivered: 'Entregue',
  cancelled: 'Cancelado',
}

export function OrderDetail({ order }: OrderDetailProps) {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-start">
        <div>
          <h2 className="text-2xl font-bold">Pedido #{order.id.slice(0, 8)}</h2>
          <p className="text-muted-foreground">
            Criado em {new Date(order.createdAt).toLocaleDateString('pt-BR')}
          </p>
        </div>
        <Badge className={statusColors[order.status]}>
          {statusLabels[order.status]}
        </Badge>
      </div>

      <div className="border rounded-lg divide-y">
        {order.items.map((item, index) => (
          <div key={index} className="p-4 flex justify-between">
            <div>
              <p className="font-medium">{item.name}</p>
              <p className="text-sm text-muted-foreground">
                Qtd: {item.quantity} × R$ {item.price.toFixed(2)}
              </p>
            </div>
            <p className="font-semibold">
              R$ {(item.price * item.quantity).toFixed(2)}
            </p>
          </div>
        ))}
      </div>

      <div className="flex justify-between items-center text-xl">
        <p className="font-bold">Total</p>
        <p className="font-bold">R$ {order.total.toFixed(2)}</p>
      </div>
    </div>
  )
}
