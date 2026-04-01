import { create } from 'zustand'
import type { Order } from '../types/orders.types'

interface OrdersStore {
  orders: Order[]
  selectedOrder: Order | null
  setOrders: (orders: Order[]) => void
  setSelectedOrder: (order: Order | null) => void
  clearSelectedOrder: () => void
}

export const useOrdersStore = create<OrdersStore>((set) => ({
  orders: [],
  selectedOrder: null,
  setOrders: (orders) => set({ orders }),
  setSelectedOrder: (order) => set({ selectedOrder: order }),
  clearSelectedOrder: () => set({ selectedOrder: null }),
}))
