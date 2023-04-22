import { redirect, fail } from '@sveltejs/kit';

export const load = ({ locals }) => {
  if (locals.pb.authStore.isValid) {
    throw redirect(303, '/');
  }
};

export const actions = {
  default: async ({ locals, request }) => {
    const { email, name, password, passwordConfirm } = Object.fromEntries(
      await request.formData()
    );

    const errors: {
      email: string[];
      password: string[];
      passwordConfirm: string[];
    } = {
      email: [],
      password: [],
      passwordConfirm: []
    };

    // Validate passwordConfirm
    if (password !== passwordConfirm) {
      errors.passwordConfirm.push("Passwords don't match.");
    }

    // Validate username
    const rx = /^((?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[\W]).{6,20})*$/;
    if (!rx.test(password)) {
      errors.password.push(
        'Password must contain one digit, special, upper, and lower case letter. Length between 8 and 20'
      );
    }

    try {
      // Check for double email
      await locals.pb
        .collection('users')
        .getFirstListItem(`email="${email}"`)
        .then(() => {
          errors.email.push('Email already taken');
        });
    } catch (err: unknown) {
      /* empty */
    }

    console.log('errors', errors);

    if (!Object.values(errors).every((l) => l.length === 0)) {
      return fail(400, { error: true, msg: errors });
    }

    const res = await locals.pb
      .collection('users')
      .create({
        email,
        name,
        password,
        passwordConfirm,
        emailVisibility: false
      })
      .catch((err) => console.log(err));

    console.log('res', res);

    throw redirect(303, '/login');
  }
};
