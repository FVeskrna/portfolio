import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// Update base to match your GitHub repository name
// e.g. if your repo is github.com/FVeskrna/portfolio, set base: '/portfolio/'
export default defineConfig({
  plugins: [vue()],
  base: '/portfolio/',
})
