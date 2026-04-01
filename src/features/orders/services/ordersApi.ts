import axios from 'axios'
import type { Order, OrdersResponse, CreateOrderRequest } from '../types/orders.types'

const api = axios.create({
  baseURL: import.meta.env.VITE_ORDERS_API_URL,
})

export const ordersApi = {
  getOrders: async (page = 1): Promise<OrdersResponse> => {
    const { data } = await api.get<OrdersResponse>('/orders', { params: { page } })
    return data
  },

  getOrderById: async (id: string): Promise<Order> => {
    const { data } = await api.get<Order>(`/orders/${id}`)
    return data
  },

  createOrder: async (request: CreateOrderRequest): Promise<Order> => {
    const { data } = await api.post<Order>('/orders', request)
    return data
  },

  cancelOrder: async (id: string): Promise<Order> => {
    const { data } = await api.post<Order>(`/orders/${id}/cancel`)
    return data
  },
}
