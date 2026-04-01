import { useState } from 'react'
import { Button } from '@rangeldor/cindle-design-system'

interface CheckoutFormProps {
  onSubmit: (items: { productId: string; quantity: number }[]) => void
  isLoading?: boolean
}

export function CheckoutForm({ onSubmit, isLoading }: CheckoutFormProps) {
  const [items, setItems] = useState<{ productId: string; quantity: number }[]>([
    { productId: '', quantity: 1 },
  ])

  const addItem = () => {
    setItems([...items, { productId: '', quantity: 1 }])
  }

  const removeItem = (index: number) => {
    setItems(items.filter((_, i) => i !== index))
  }

  const updateItem = (index: number, field: 'productId' | 'quantity', value: string | number) => {
    const newItems = [...items]
    newItems[index] = { ...newItems[index], [field]: value }
    setItems(newItems)
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const validItems = items.filter((item) => item.productId.trim() !== '')
    if (validItems.length > 0) {
      onSubmit(validItems)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {items.map((item, index) => (
        <div key={index} className="flex gap-4 items-end">
          <div className="flex-1">
            <label className="text-sm font-medium">Produto ID</label>
            <input
              type="text"
              value={item.productId}
              onChange={(e) => updateItem(index, 'productId', e.target.value)}
              className="w-full px-3 py-2 border rounded-md"
              placeholder="ID do produto"
            />
          </div>
          <div className="w-24">
            <label className="text-sm font-medium">Qtd</label>
            <input
              type="number"
              min="1"
              value={item.quantity}
              onChange={(e) => updateItem(index, 'quantity', parseInt(e.target.value) || 1)}
              className="w-full px-3 py-2 border rounded-md"
            />
          </div>
          {items.length > 1 && (
            <Button type="button" variant="outline" onClick={() => removeItem(index)}>
              ×
            </Button>
          )}
        </div>
      ))}
      <Button type="button" variant="outline" onClick={addItem}>
        Adicionar item
      </Button>
      <Button type="submit" disabled={isLoading} className="w-full">
        {isLoading ? 'Enviando...' : 'Finalizar pedido'}
      </Button>
    </form>
  )
}
