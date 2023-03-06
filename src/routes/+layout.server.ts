export const load = ({ locals, route}) => {
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