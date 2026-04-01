import { z } from 'zod'

export const createOrderSchema = z.object({
  items: z.array(
    z.object({
      productId: z.string().min(1),
      quantity: z.number().min(1),
    })
  ).min(1, 'Adicione pelo menos um item'),
})

export type CreateOrderFormData = z.infer<typeof createOrderSchema>
