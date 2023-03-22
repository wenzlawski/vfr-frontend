import { error } from '@sveltejs/kit';

export const actions = {
	waitlist: async () => {
		// const data = await request.formData();
		// const id = data.get('id') as string;

		try {
			// await updateDocument(id, { deleted: true });
			// add email to waitlist
		} catch (err: any) {
			console.log('Error: ', err);
			throw error(err.status, err.message);
		}
		return {
			success: true,
			message: 'deleted'
		};
	}
};
