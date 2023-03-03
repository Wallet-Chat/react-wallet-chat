import { defineConfig } from 'vite'
import { nodePolyfills } from 'vite-plugin-node-polyfills'
import react from '@vitejs/plugin-react'
import viteTsconfigPaths from 'vite-tsconfig-paths'
import svgrPlugin from 'vite-plugin-svgr'
import path from 'path'
import dts from 'vite-plugin-dts'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), viteTsconfigPaths(), svgrPlugin(), nodePolyfills(), dts()],

  resolve: {
    alias: [{ find: '@', replacement: path.resolve(__dirname, '.') }],
  },

  build: {
    lib: {
      entry: path.resolve(__dirname, 'index.ts'),
      name: 'react-wallet-chat',
      fileName: (format) => `index.${format}.js`,
    },
    rollupOptions: {
      external: ['react'],
    },
  },
})
