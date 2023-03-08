import { redirect, type Handle } from '@sveltejs/kit';
import { SvelteKitAuth } from '@auth/sveltekit';
import GitHub from '@auth/core/providers/github';
import GoogleProvider from '@auth/core/providers/google';
import clientPromise from '$lib/mongodb';
import { MongoDBAdapter } from '@next-auth/mongodb-adapter';
import type { Provider } from '@auth/core/providers';
import type { Adapter } from '@auth/core/adapters';
import { sequence } from '@sveltejs/kit/hooks';

// src/hooks.server.ts

async function authorization({ event, resolve }) {
	// Protect any routes under /authenticated
	const session = await event.locals.getSession();
	if (event.url.pathname.startsWith('/settings') || event.url.pathname.startsWith('/documents')) {
		if (!session) {
			throw redirect(303, '/auth');
		}
	}

	// If the request is still here, just proceed as normally
	const result = await resolve(event, {
		transformPageChunk: ({ html }) => html
	});
	return result;
}

export const handle: Handle = sequence(
	SvelteKitAuth({
		providers: [
			GitHub({
				clientId: import.meta.env.GITHUB_ID,
				clientSecret: import.meta.env.GITHUB_SECRET
			}) as Provider,
			// TODO: Handle refresh token https://next-auth.js.org/providers/google
			GoogleProvider({
				clientId: import.meta.env.GOOGLE_CLIENT_ID,
				clientSecret: import.meta.env.GOOGLE_CLIENT_SECRET
			}) as Provider
			// TODO: Add email provider
			// TODO: Add Apple provider
		],
		adapter: MongoDBAdapter(clientPromise) as Adapter
	}),
	authorization
);
