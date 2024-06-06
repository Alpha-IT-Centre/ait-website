import { defineConfig } from 'vite';

export default defineConfig({
  server: {
    watch: {
      usePolling: true,
      ignored: ['!**/src/**']
    },
    hmr: true,
  },
  build: {
    rollupOptions: {
      input: 'index.html',
    },
  },
});
