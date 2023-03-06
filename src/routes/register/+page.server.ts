import { redirect, fail, type ActionFailure } from '@sveltejs/kit';

export const load = ({ locals }) => {
  if (locals.pb.authStore.isValid) {
    throw redirect(303, '/');
  }
};

export const actions = {
  default: async ({ locals, request }) => {
    console.log("entry")
    let data = Object.fromEntries(await request.formData()) as {
      email: string
      username: string
      name: string
      password: string
      passwordConfirm: string
    }

    let errors: {
      username: string[]
      email: string[]
      password: string[]
      passwordConfirm: string[]
    } = {
      username: [],
      email: [],
      password: [],
      passwordConfirm: []
    };

    // Validate username
    var regex = /^[a-zA-Z0-9]+([_-]?[a-zA-Z0-9])*$/
    if (!regex.test(data.username)) {
      console.log("failed regex")
      errors.username.push("Invalid username")
    }

    // Validate passwordConfirm
    if (data.password !== data.passwordConfirm) {
      errors.passwordConfirm.push("Passwords don't match.")
    }

    // Validate username
    var regex = /^((?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[\W]).{6,20})*$/
    if (!regex.test(data.password)) {
      errors.password.push("Password must contain one digit, special, upper, and lower case letter. Length between 8 and 20")
    }

    // Check for double username
    await locals.pb.collection('users').getFirstListItem(`username="${data.username}"`).then(
      () => {
        errors.username.push("Username already taken")
      }
    ).catch(() => { });

    // Check for double email
    await locals.pb.collection('users').getFirstListItem(`email="${data.email}"`).then(
      () => {
        errors.email.push("Email already taken")
      }
    ).catch(() => { });

    if (!Object.values(errors).every((l) => l.length === 0)) {
      return fail(400, { error: true, msg: errors })
    }

    const res = await locals.pb.collection('users').create(data).catch(err => console.log(err));
    console.log('res', res)

    throw redirect(303, '/login');
  }
};