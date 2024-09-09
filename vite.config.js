import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  esbuild: {
    loader: "jsx",
    include: /src\/.*\.jsx?$/,
    // loader: "tsx",
    // include: /src\/.*\.[tj]sx?$/,
  }, resolve: {
    alias: {
      // 클라이언트에서 사용하지 않을 모듈에 대한 별칭 설정
      express: 'path-to-empty-module',
    },
  },
  optimizeDeps: {
    exclude: ['express'], // express를 디펜던시 최적화에서 제외
    esbuildOptions: {
      loader: {
        '.js': 'jsx',
      },
    },
  },
})