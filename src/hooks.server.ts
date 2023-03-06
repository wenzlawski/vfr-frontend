import { serializeNonPOJOs } from '$lib/helpers';
import PocketBase from 'pocketbase';
import { redirect, type Handle } from '@sveltejs/kit'
import { validateUrl } from '$lib/helpers';

const protectedRoutes = [
  "/settings",
  "/documents",
]

export const handle: Handle = async ({ event, resolve }) => {
  const validDomains = /^(.*)?\.?localhost.*$/;
  let cors = '';

  if (validDomains.test(event.url.hostname)) {
    // cors = `https://${event.url.hostname}`;
    cors = '*';
  }

  event.locals.pb = new PocketBase("http://localhost:8090");
  event.locals.pb.authStore.loadFromCookie(event.request.headers.get('cookie') || '');

  if (event.locals.pb.authStore.isValid) {
    event.locals.user = serializeNonPOJOs(event.locals.pb.authStore.model);
  }

  if (!event.locals.user && validateUrl(event.url.pathname, protectedRoutes)) {
    throw redirect(303, '/login');
  }

  const response = await resolve(event);

  // Apply CORS header for API routes
  if (event.url.pathname.startsWith('/api')) {
    // if (event.request.method === 'OPTIONS' && cors) {
    //   return new Response(null, {
    //     headers: {
    //       'Access-Control-Allow-Methods': 'POST, GET, OPTIONS, DELETE',
    //       'Access-Control-Allow-Origin': cors,
    //     }
    //   });
    // }
    response.headers.append('Access-Control-Allow-Origin', cors);
  }


  // TODO: secure before deployment
  response.headers.set('set-cookie', event.locals.pb.authStore.exportToCookie({ secure: false }));

  return response;
};