import { redirect, type Handle } from '@sveltejs/kit';
import { SvelteKitAuth } from '@auth/sveltekit';
import GitHub from '@auth/core/providers/github';
import Google from '@auth/core/providers/google';
import Discord from '@auth/core/providers/discord';
import clientPromise from '$lib/db/mongodb';
import { MongoDBAdapter } from '@next-auth/mongodb-adapter';
import type { Provider } from '@auth/core/providers';
import type { Adapter } from '@auth/core/adapters';
import { sequence } from '@sveltejs/kit/hooks';
import {
	GITHUB_ID,
	GITHUB_SECRET,
	GOOGLE_CLIENT_ID,
	GOOGLE_CLIENT_SECRET,
	DISCORD_CLIENT_ID,
	DISCORD_CLIENT_SECRET,
	NEXTAUTH_SECRET
} from '$env/static/private';

// src/hooks.server.ts

async function theming({ event, resolve }) {
	const theme = event.cookies.get('theme') || null;

	// if (newTheme) {
	// 	theme = newTheme;
	// } else if (cookieTheme) {
	// 	theme = cookieTheme;
	// }

	if (theme) {
		return await resolve(event, {
			transformPageChunk: ({ html }) => html.replace('data-theme=""', `data-theme="${theme}"`)
		});
	}

	const result = await resolve(event, {
		transformPageChunk: ({ html }) => html
	});
	return result;
}

async function authorization({ event, resolve }) {
	// Protect any routes under /authenticated
	const session = await event.locals.getSession();
	if (
		event.url.pathname.startsWith('/settings') ||
		event.url.pathname.startsWith('/documents') ||
		event.url.pathname.startsWith('/api')
	) {
		if (!session) {
			throw redirect(303, '/auth');
		}
	} else if (
		event.url.pathname.startsWith('/login') ||
		event.url.pathname.startsWith('/register')
	) {
		if (session) {
			throw redirect(303, '/');
		}
	}

	// If the request is still here, just proceed as normally
	return await resolve(event, {
		transformPageChunk: ({ html }) => html
	});
}

export const handle: Handle = sequence(
	SvelteKitAuth({
		providers: [
			GitHub({
				clientId: GITHUB_ID,
				clientSecret: GITHUB_SECRET
			}) as Provider,
			// TODO: Handle refresh token https://next-auth.js.org/providers/google
			Google({
				clientId: GOOGLE_CLIENT_ID,
				clientSecret: GOOGLE_CLIENT_SECRET
			}) as Provider,
			Discord({
				clientId: DISCORD_CLIENT_ID,
				clientSecret: DISCORD_CLIENT_SECRET
			}) as Provider
			// TODO: Add email provider
			// TODO: Add Apple provider
		],
		pages: {
			signIn: '/login',
			newUser: '/register'
		},
		adapter: MongoDBAdapter(clientPromise) as Adapter,
		callbacks: {
			async session({ session, user }) {
				// Send properties to the client, like an access_token and user id from a provider.
				if (session.user) {
					// eslint-disable-next-line @typescript-eslint/ban-ts-comment
					// @ts-ignore
					session.user.id = user.id;
				}

				return session;
			}
		},
		secret: NEXTAUTH_SECRET
	}),
	authorization,
	theming
);
