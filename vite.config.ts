import { sveltekit } from '@sveltejs/kit/vite';
import topLevelAwait from 'vite-plugin-top-level-await';

const config = {
  plugins: [sveltekit(),
  topLevelAwait({
    promiseExportName: "__tla",
    promiseImportName: i => `__tla_${i}`
  })],
  test: {
    include: ['src/**/*.{test,spec}.{js,ts}']
  },
  optimizeDeps: {
    allowNodeBuiltins: ['pouchdb-browser', 'pouchdb-utils']
  },
};

export default config;
