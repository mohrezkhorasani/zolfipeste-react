import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import path from 'path'   // ← این خط مهمه
// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
  ],
  resolve: {
    alias: {
      // گزینه ۱: @ یعنی src (رایج‌ترین و بهترین)
      '@': path.resolve(__dirname, './src'),

      // گزینه ۲: اگر حتما می‌خوای با src/ شروع بشه (کمتر رایج ولی ممکنه)
      // 'src': path.resolve(__dirname, './src'),

      // گزینه ۳: aliasهای اضافی (اختیاری ولی خیلی مفید)
      '@assets': path.resolve(__dirname, './src/assets'),
      '@components': path.resolve(__dirname, './src/components'),
      '@js': path.resolve(__dirname, './src/js'),
    }
  }
})
