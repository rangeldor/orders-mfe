import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { OrdersApp } from './OrdersApp'
import './index.css'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <div className="min-h-screen bg-background">
      <OrdersApp />
    </div>
  </StrictMode>,
)
