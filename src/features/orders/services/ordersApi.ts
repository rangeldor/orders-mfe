import axios from 'axios'
import type { Order, OrdersResponse, CreateOrderRequest } from '../types/orders.types'

const api = axios.create({
  baseURL: import.meta.env.VITE_ORDERS_API_URL,
  // If the backend uses cookie-based sessions (no token returned on login),
  // enable sending credentials so cookies are included in cross-site requests
  withCredentials: true,
})

function getAuthToken(): string | null {
  try {
    const simpleToken = localStorage.getItem('token')
    if (simpleToken) return simpleToken
    const raw = localStorage.getItem('auth-storage')
    if (!raw) return null
    const parsed = JSON.parse(raw)
    if (parsed?.token) return parsed.token
    if (parsed?.state?.token) return parsed.state.token
    return null
  } catch {
    return null
  }
}

export const ordersApi = {
  getOrders: async (page = 1): Promise<OrdersResponse> => {
    const token = getAuthToken()
    const headers = token ? { Authorization: `Bearer ${token}` } : undefined
    const { data } = await api.get('/orders', { params: { page }, headers })
    if (Array.isArray(data)) return { orders: data }
    if (data && Array.isArray((data as any).orders)) return data as OrdersResponse
    return { orders: [] }
  },

  getOrderById: async (id: string): Promise<Order> => {
    const { data } = await api.get<Order>(`/orders/${id}`)
    return data
  },

  createOrder: async (request: CreateOrderRequest): Promise<Order> => {
    const token = getAuthToken()
    const headers = token ? { Authorization: `Bearer ${token}` } : undefined
    const { data } = await api.post<Order>('/orders', request, { headers })
    return data
  },

  cancelOrder: async (id: string): Promise<Order> => {
    const token = getAuthToken()
    const headers = token ? { Authorization: `Bearer ${token}` } : undefined
    const { data } = await api.post<Order>(`/orders/${id}/cancel`, undefined, { headers })
    return data
  },
}
