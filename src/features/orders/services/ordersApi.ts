import axios, { isAxiosError } from 'axios'
import type { Order, CreateOrderRequest } from '../types/orders.types'

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

async function request<T>(fn: () => Promise<{ data: T }>): Promise<T> {
  try {
    const { data } = await fn()
    return data
  } catch (err: unknown) {
    if (isAxiosError(err) && err.response?.status === 401) {
      throw new AuthError()
    }
    throw err
  }
}

export const ordersApi = {
  async getOrders(page = 1): Promise<Order[]> {
    const token = getAuthToken()
    const headers = token ? { Authorization: `Bearer ${token}` } : undefined
    return await request(() => api.get<Order[]>('/orders', { params: { page }, headers }))
  },

  async getOrderById(id: string): Promise<Order> {
    return await request(() => api.get<Order>(`/orders/${id}`))
  },

  async createOrder(request: CreateOrderRequest): Promise<Order> {
    const token = getAuthToken()
    const headers = token ? { Authorization: `Bearer ${token}` } : undefined
    return await request(() => api.post<Order>('/orders', request, { headers }))
  },

  async cancelOrder(id: string): Promise<Order> {
    const token = getAuthToken()
    const headers = token ? { Authorization: `Bearer ${token}` } : undefined
    return await request(() => api.post<Order>(`/orders/${id}/cancel`, undefined, { headers }))
  },
}
