export interface Order {
    id: string;
    userId: string;
    items: OrderItem[];
    total: number;
    status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
    createdAt: string;
    updatedAt: string;
}
export interface OrderItem {
    productId: string;
    name: string;
    price: number;
    quantity: number;
}
export interface CreateOrderRequest {
    items: {
        productId: string;
        quantity: number;
    }[];
}
export interface OrdersResponse {
    orders: Order[];
    total: number;
    page: number;
}
