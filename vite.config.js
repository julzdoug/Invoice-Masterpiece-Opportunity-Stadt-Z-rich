import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(
      {
      compilerOptions: {
        isCustomElement: (tag) => tag.startsWith('edit-'),
      },
    }
    )],
    optimizeDeps: {
    include: ['vue', 'vue-router'], // Manually include Vue Router here
  },
})


