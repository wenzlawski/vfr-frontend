export async function load({ locals, route }) {
	return {
		session: await locals.getSession(),
		route
	};
}
