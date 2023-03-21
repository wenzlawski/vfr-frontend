// import adapter from '@sveltejs/adapter-node';
import adapter from '@sveltejs/adapter-vercel';
import preprocess from 'svelte-preprocess';

/** @type {import('@sveltejs/kit').Config} */
const config = {
  // Consult https://kit.svelte.dev/docs/integrations#preprocessors
  // for more information about preprocessors
  preprocess: preprocess(),

  kit: {
    adapter: adapter({
      runtime: 'nodejs18.x',
    }),
    csrf: {
      checkOrigin: false,
    }

  }
};

export default config;
