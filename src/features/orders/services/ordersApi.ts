import axios from 'axios'
import type { Order, OrdersResponse, CreateOrderRequest } from '../types/orders.types'

export class AuthError extends Error {
  constructor(message = 'Unauthorized') {
    super(message)
    this.name = 'AuthError'
  }
}

const api = axios.create({
  baseURL: import.meta.env.VITE_ORDERS_API_URL,
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

function request<T>(fn: () => Promise<axios.AxiosResponse<T>>): Promise<T> {
  return fn().catch((err) => {
    if (err.response?.status === 401) throw new AuthError()
    throw err
  })
}

export const ordersApi = {
  getOrders: async (page = 1): Promise<OrdersResponse> => {
    const token = getAuthToken()
    const headers = token ? { Authorization: `Bearer ${token}` } : undefined
    return request(() =>
      api.get('/orders', { params: { page }, headers }).then((r) => r.data)
    ).then((data) => {
      if (Array.isArray(data)) return { orders: data }
      if (data && Array.isArray((data as any).orders)) return data as OrdersResponse
      return { orders: [] }
    })
  },

  getOrderById: async (id: string): Promise<Order> => {
    return request(() => api.get<Order>(`/orders/${id}`).then((r) => r.data))
  },

  createOrder: async (request: CreateOrderRequest): Promise<Order> => {
    const token = getAuthToken()
    const headers = token ? { Authorization: `Bearer ${token}` } : undefined
    return request(() =>
      api.post<Order>('/orders', request, { headers }).then((r) => r.data)
    )
  },

  cancelOrder: async (id: string): Promise<Order> => {
    const token = getAuthToken()
    const headers = token ? { Authorization: `Bearer ${token}` } : undefined
    return request(() =>
      api.post<Order>(`/orders/${id}/cancel`, undefined, { headers }).then((r) => r.data)
    )
  },
}
