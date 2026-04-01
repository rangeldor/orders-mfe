# Orders MFE

Micro-frontend de pedidos standalone.

## Scripts

```bash
npm run dev          # Inicia em http://localhost:3007
npm run build        # Build para produção
npm run lint         # Verifica código
npm run test         # Executa testes
```

## Variáveis de Ambiente

```env
VITE_ORDERS_API_URL=http://localhost:3003
VITE_ORDERS_URL=http://localhost:3007
VITE_AUTH_URL=http://localhost:3005
```

## Exposições Module Federation

| Expose | Descrição |
|--------|-----------|
| `./OrderList` | Lista de pedidos |
| `./OrderDetail` | Detalhes do pedido |
| `./CheckoutForm` | Formulário de checkout |
| `./OrdersPage` | Página de pedidos |
| `./OrderDetailPage` | Página de detalhes |

## Estrutura

```
src/
├── features/orders/  # Lógica de pedidos
├── shared/          # Componentes compartilhados
└── main.tsx         # Entry point
```
