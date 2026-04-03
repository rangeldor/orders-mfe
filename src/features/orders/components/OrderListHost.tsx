import type { Order } from '../types/orders.types'
import { Badge, Button, Card, CardContent, CardFooter, CardHeader, CardTitle } from '@rangeldor/cindle-design-system'

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
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {orders.map((order) => (
        <Card key={order.id}>
          <CardHeader className="pb-2">
            <div className="flex justify-between items-start">
              <div>
                <CardTitle>Pedido #{order.id.slice(0, 8)}</CardTitle>
                <p className="text-sm text-muted-foreground mt-1">
                  {new Date(order.createdAt).toLocaleDateString('pt-BR')}
                </p>
              </div>
              <Badge className={statusColors[order.status]}>
                {statusLabels[order.status]}
              </Badge>
            </div>
          </CardHeader>
          <CardContent className="pb-2">
            <p className="font-bold text-lg">R$ {(order.totalAmount ?? 0).toFixed(2)}</p>
          </CardContent>
          <CardFooter>
            <Button size="sm" render={<a href={`${basePath}/${order.id}`} />}>
              Ver detalhes
            </Button>
          </CardFooter>
        </Card>
      ))}
    </div>
  )
}
