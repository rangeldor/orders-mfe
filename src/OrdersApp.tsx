import { useOrders } from './features/orders/hooks/useOrders'
import { OrderListHost } from './features/orders/components/OrderListHost'
import { AuthError } from './features/orders/services/ordersApi'
import { Skeleton } from '@rangeldor/cindle-design-system'

function OrdersApp() {
  const { orders, isLoading, error } = useOrders()

  if (error instanceof AuthError) {
    window.location.replace('/login')
    return null
  }

  if (isLoading) {
    return (
      <div className="p-8">
        <div className="space-y-4">
          {[...Array(3)].map((_, i) => (
            <Skeleton key={i} className="h-24" />
          ))}
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="text-center py-8 text-destructive">
        Erro ao carregar pedidos. Tente novamente.
      </div>
    )
  }

  if (!orders?.length) {
    return (
      <div className="text-center py-8 text-muted-foreground">
        Nenhum pedido encontrado.
      </div>
    )
  }

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-6">Pedidos</h1>
      <OrderListHost orders={orders} basePath="/pedidos" />
    </div>
  )
}

export { OrdersApp }
