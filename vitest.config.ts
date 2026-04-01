import { defineConfig } from 'vitest/config'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { federation } from '@module-federation/vite'

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    federation({
      name: 'orders',
      filename: 'remoteEntry.js',
      exposes: {
        './OrderList': './src/features/orders/components/OrderList.tsx',
        './OrderDetail': './src/features/orders/components/OrderDetail.tsx',
        './CheckoutForm': './src/features/orders/components/CheckoutForm.tsx',
        './OrdersPage': './src/features/orders/pages/OrdersPage.tsx',
        './OrderDetailPage': './src/features/orders/pages/OrderDetailPage.tsx',
      },
      remotes: {
        auth: 'auth@http://localhost:3005/remoteEntry.js',
      },
    }),
  ],
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: ['./src/test/setup.ts'],
    include: ['src/**/*.{test,spec}.{js,mjs,cjs,ts,mts,cts,jsx,tsx}'],
  },
})
