// See https://kit.svelte.dev/docs/types#app
// for information about these interfaces

import type { DefaultSession } from '@auth/core/types';

// and what to do when importing types
declare namespace App {
	// interface Locals {}
	// interface Error {}
	// interface PageData {}
	// interface Platform {}
}

declare module '@auth/core' {
	interface Session {
		user: {
			id: string;
		} & DefaultSession['user'];
	}
}
