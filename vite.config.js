import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    proxy: {
      '/scorm-modules': 'http://localhost:4000',
      '/modules': 'http://localhost:4000',
      '/upload-scorm': 'http://localhost:4000'
    }
  }
});
