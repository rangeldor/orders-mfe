import { defineConfig } from 'vite'
import { federation } from '@module-federation/vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  build: {
    target: 'esnext',
  },
  server: {
    port: 3010,
    headers: {
      'Access-Control-Allow-Origin': '*',
    },
  },
  preview: {
    port: 3010,
    headers: {
      'Access-Control-Allow-Origin': '*',
    },
  },
  plugins: [
    react(),
    tailwindcss(),
    federation({
      name: 'orders',
      filename: 'remoteEntry.js',
      exposes: {
        './OrderList': './src/features/orders/components/OrderListHost.tsx',
        './OrdersPage': './src/features/orders/pages/OrdersPageHost.tsx',
        './NuqsAdapter': './src/exports/NuqsAdapter.ts',
      },
      shared: {
        react: { singleton: true, requiredVersion: '18.3.1' },
        'react-dom': { singleton: true, requiredVersion: '18.3.1' },
        'react-router': { singleton: true },
        'react-router-dom': { singleton: true },
        '@tanstack/react-query': { singleton: true, requiredVersion: '5.96.1' },
        nuqs: { singleton: true, requiredVersion: '2.8.9' },
      },
    }),
  ],
  resolve: {
    alias: {
      '@': '/src',
    },
  },
})
