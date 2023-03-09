// import type { Actions } from './$types';
// import { redirect } from '@sveltejs/kit';

export async function load({ fetch }) {
	return {
		providers: fetch('/auth/providers').then((res) => res.json())
	};
}

// export const actions: Actions = {
// 	default: async ({ request, locals, url }) => {
// 		const data = Object.fromEntries(await request.formData()) as {
// 			email: string;
// 			password: string;
// 		};

// 		console.log('logging in with', data);

// 		if (url.searchParams.has('redirectTo')) {
// 			throw redirect(303, url.searchParams.get('redirectTo')?.toString() ?? '/');
// 		}

// 		throw redirect(303, '/');
// 	}
// };
