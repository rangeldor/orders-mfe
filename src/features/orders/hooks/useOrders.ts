import { useQuery } from '@tanstack/react-query'
import { useQueryState } from 'nuqs'
import { ordersApi } from '../services/ordersApi'
import { parsers } from '../utils/parsers'

export function useOrders() {
  let page: number | undefined

  try {
    // Guard against missing nuqs adapter in host integration — if the
    // adapter isn't available, useQueryState will throw. In that case we
    // gracefully fall back to undefined so the query still runs.
    // It's important to call the hook consistently; we wrap it in try/catch
    // but always call it so hook order is preserved.
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const res = useQueryState('page', parsers.page)
    page = res?.[0]
  } catch (e) {
    // Adapter missing — fall back silently
    // (do not log in normal dev flow to keep console clean)
    page = undefined
  }

  const query = useQuery({
    queryKey: ['orders', { page }],
    queryFn: async () => {
      const orders = await ordersApi.getOrders(page ?? 1)
      return { orders }
    },
  })

  return { orders: query.data?.orders, isLoading: query.isLoading, error: query.error }
}
