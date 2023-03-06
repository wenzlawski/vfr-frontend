import { sveltekit } from '@sveltejs/kit/vite';

/** @type {import('vite').UserConfig} */
const config = {
  plugins: [sveltekit()],
  test: {
    include: ['src/**/*.{test,spec}.{js,ts}']
  },
  optimizeDeps: {
    allowNodeBuiltins: ['pouchdb-browser', 'pouchdb-utils']
  }
};

export default config;
