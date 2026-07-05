import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  build: {
    target: ['es2018', 'chrome80'],
    // 提高 chunk 大小警告限制到 1000kb
    chunkSizeWarningLimit: 1000,
    rollupOptions: {
      output: {
        // 手动分包策略 - 使用函数形式
        manualChunks(id) {
          // React 核心库
          if (id.includes('node_modules')) {
            if (id.includes('react') || id.includes('react-dom') || id.includes('react-router')) {
              return 'react-vendor';
            }
            // ECharts 图表库（通常很大，单独分包）
            if (id.includes('echarts')) {
              return 'echarts-vendor';
            }
            // 其他 node_modules 依赖
            return 'vendor';
          }
        },
        // 为每个 chunk 生成更友好的文件名
        chunkFileNames: 'assets/[name]-[hash].js',
        entryFileNames: 'assets/[name]-[hash].js',
        assetFileNames: 'assets/[name]-[hash].[ext]',
      },
    },
    // 启用 CSS 代码分割
    cssCodeSplit: true,
    // 使用默认的压缩器（Vite 8 使用 Oxc）
    // 生成 sourcemap 用于生产环境调试（可选）
    sourcemap: false,
  },
  // 优化依赖预构建
  optimizeDeps: {
    include: ['react', 'react-dom', 'react-router'],
  },
});
