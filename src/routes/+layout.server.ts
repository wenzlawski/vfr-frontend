export async function load({ locals, route, cookies }) {
	return {
		session: await locals.getSession(),
		route,
		theme: cookies.get('theme') || 'light'
	};
}
