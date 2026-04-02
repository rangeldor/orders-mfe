import { useEffect } from 'react'
import { useOrders } from '../hooks/useOrders'
import { OrderListHost } from '../components/OrderListHost'
import { AuthError } from '../services/ordersApi'
import { Skeleton } from '@rangeldor/cindle-design-system'

export function OrdersPageHost() {
  const { data, isLoading, error } = useOrders()

  useEffect(() => {
    if (error instanceof AuthError) {
      window.location.href = '/login'
    }
  }, [error])

  if (isLoading) {
    return (
      <div className="space-y-4">
        {[...Array(3)].map((_, i) => (
          <Skeleton key={i} className="h-24" />
        ))}
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

  if (!data?.orders.length) {
    return (
      <div className="text-center py-8 text-muted-foreground">
        Nenhum pedido encontrado.
      </div>
    )
  }

  return <OrderListHost orders={data.orders} />
}
