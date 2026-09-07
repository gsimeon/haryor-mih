import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import {defineConfig} from 'vite';

export default defineConfig(({ command }) => {
  // In development, serve from root '/'.
  // In production builds, resolve base path relative to repository path:
  // 1. Checks VITE_BASE if passed explicitly
  // 2. Checks GITHUB_REPOSITORY (e.g. 'gsimeon/haryor-mih' -> '/haryor-mih/')
  // 3. Defaults to '/haryor-mih/' for GitHub Pages project hosting
  let repoPath = '/haryor-mih/';
  if (process.env.GITHUB_REPOSITORY) {
    const parts = process.env.GITHUB_REPOSITORY.split('/');
    if (parts[1]) {
      repoPath = `/${parts[1]}/`;
    }
  }

  let rawBase = process.env.VITE_BASE || repoPath;
  rawBase = rawBase.replace(/\/+/g, '/');
  if (!rawBase.startsWith('/')) rawBase = '/' + rawBase;
  if (!rawBase.endsWith('/')) rawBase += '/';

  const base = command === 'serve' ? '/' : rawBase;

  return {
    base,
    plugins: [react(), tailwindcss()],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, '.'),
      },
    },
    server: {
      // HMR is disabled in AI Studio via DISABLE_HMR env var.
      // Do not modifyâfile watching is disabled to prevent flickering during agent edits.
      hmr: process.env.DISABLE_HMR !== 'true',
      // Disable file watching when DISABLE_HMR is true to save CPU during agent edits.
      watch: process.env.DISABLE_HMR === 'true' ? null : {},
    },
  };
});
