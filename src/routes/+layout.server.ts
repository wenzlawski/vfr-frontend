export const load = ({ locals, route, params }) => {
  if (locals.user) {
    return {
      user: locals.user,
      route: route
    };
  }

  return {
    user: undefined,
    route: route
  }
};