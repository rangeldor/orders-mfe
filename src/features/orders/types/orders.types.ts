export interface ShippingAddress {
  street: string
  city: string
  state: string
  zipCode: string
  country: string
}

export interface OrderItem {
  productId: string
  productName: string
  quantity: number
  unitPrice: number
  subtotal: number
}

export interface Order {
  id: string
  userId: string
  items: OrderItem[]
  totalAmount: number
  status: 'PENDING' | 'PROCESSING' | 'SHIPPED' | 'DELIVERED' | 'CANCELLED' | string
  shippingAddress: ShippingAddress
  createdAt: string
  updatedAt: string
}

export interface CreateOrderRequest {
  items: { productId: string; quantity: number }[]
  shippingAddress?: Partial<ShippingAddress>
}
