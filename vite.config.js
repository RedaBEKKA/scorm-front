import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/scorm-modules': 'http://localhost:4000',
      '/modules': 'http://localhost:4000',
      '/upload-scorm': 'http://localhost:4000'
    }
  }
});
