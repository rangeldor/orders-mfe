import type { Order } from '../types/orders.types'
import { Badge } from '@rangeldor/cindle-design-system'

interface OrderListHostProps {
  orders: Order[]
  basePath?: string
}

const statusColors: Record<string, string> = {
  PENDING: 'bg-yellow-100 text-yellow-800',
  pending: 'bg-yellow-100 text-yellow-800',
  PROCESSING: 'bg-blue-100 text-blue-800',
  processing: 'bg-blue-100 text-blue-800',
  SHIPPED: 'bg-purple-100 text-purple-800',
  shipped: 'bg-purple-100 text-purple-800',
  DELIVERED: 'bg-green-100 text-green-800',
  delivered: 'bg-green-100 text-green-800',
  CANCELLED: 'bg-red-100 text-red-800',
  cancelled: 'bg-red-100 text-red-800',
}

const statusLabels: Record<string, string> = {
  PENDING: 'Pendente',
  pending: 'Pendente',
  PROCESSING: 'Processando',
  processing: 'Processando',
  SHIPPED: 'Enviado',
  shipped: 'Enviado',
  DELIVERED: 'Entregue',
  delivered: 'Entregue',
  CANCELLED: 'Cancelado',
  cancelled: 'Cancelado',
}

export function OrderListHost({ orders, basePath = '/pedidos' }: OrderListHostProps) {
  return (
    <div className="space-y-4">
      {orders.map((order) => (
        <div key={order.id} className="border rounded-lg p-4">
          <div className="flex justify-between items-start mb-2">
            <div>
              <p className="font-semibold">Pedido #{order.id.slice(0, 8)}</p>
              <p className="text-sm text-muted-foreground">
                {new Date(order.createdAt).toLocaleDateString('pt-BR')}
              </p>
            </div>
            <Badge className={statusColors[order.status]}>
              {statusLabels[order.status]}
            </Badge>
          </div>
          <div className="flex justify-between items-center">
            <p className="font-bold">R$ {(order.totalAmount ?? 0).toFixed(2)}</p>
            <a
              href={`${basePath}/${order.id}`}
              className="text-primary hover:underline text-sm"
            >
              Ver detalhes
            </a>
          </div>
        </div>
      ))}
    </div>
  )
}
