import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue({
      compilerOptions: {
        isCustomElement: (tag) => tag.startsWith('edit-'),
      },
    }),
  ],
  optimizeDeps: {
    include: ['vue', 'vue-router'], // Manually include Vue Router here
  },
  build: {
    rollupOptions: {
      external: ['/src/assets/logo.svg'], // Add the path to the file you want to exclude
    },
  },
});
