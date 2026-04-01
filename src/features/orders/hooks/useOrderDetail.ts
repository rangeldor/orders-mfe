import { useQuery } from '@tanstack/react-query'
import { ordersApi } from '../services/ordersApi'

export function useOrderDetail(id: string | undefined) {
  return useQuery({
    queryKey: ['order', id],
    queryFn: () => {
      if (!id) throw new Error('Order ID is required')
      return ordersApi.getOrderById(id)
    },
    enabled: !!id,
  })
}
