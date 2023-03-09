import { error, redirect } from '@sveltejs/kit';
import { updateProfileSchema } from '$lib/schemas';
import { validateData } from '$lib/utils';
import { serialize } from 'object-to-formdata';

// export const load = ({ locals }) => {
//   if (!locals.pb.authStore.isValid) {
//     throw redirect(303, '/login');
//   }
// };
