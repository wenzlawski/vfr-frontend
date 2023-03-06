import * as zod from 'zod';

export const loginUserSchema = zod.object({
	email: zod
		.string()
		.email({ message: 'Must be a valid email.' })
		.min(1, { message: 'Email is required' }),
	password: zod.string().min(1, { message: 'Password is required' })
});

export const updateUsernameSchema = zod.object({
	username: zod
		.string()
		.regex(/^[a-zA-z\d-_]*$/, { message: 'Username can only contain letters, numbers, -, _' })
		.min(2, { message: 'Username must be at least 4 characters' })
		.max(64, { message: 'Username must be less than 64 characters' })
		.trim()
});

export const updateProfileSchema = zod.object({
	name: zod
		.string()
		.regex(/^[a-zA-z\s]*$/, { message: 'Name can only contain letters and spaces.' })
		.min(2, { message: 'Name must be at least 2 characters' })
		.max(64, { message: 'Name must be less than 64 characters' })
		.trim(),
	avatar: zod.string().url({ message: 'Must be a valid URL' }).optional()
});

export const updatePasswordSchema = zod
	.object({
		password: zod.string({ required_error: 'Confirm Password is required' }),
		newPassword: zod
			.string()
			.regex(
				/^(?=.*?[a-z])(?=.*?[A-Z])(?=.*?[0-9])(?=.*?[!"#$%&'()*+,-./:;<=>?@[\]^_`{|}~])[a-zA-Z0-9!"#$%&'()*+,-./:;<=>?@[\]^_`{|}~]{8,}$/,
				{
					message:
						'Password must be a minimum of 8 characters & contain at least one upper and lower case letter, one number, and one special character.'
				}
			)
			.min(1, { message: 'New password is required' }),
		newPasswordConfirm: zod.string({ required_error: 'Confirm Password is required' })
	})
	.superRefine(({ newPassword, newPasswordConfirm }, ctx) => {
		if (newPassword !== newPasswordConfirm) {
			ctx.addIssue({
				code: zod.ZodIssueCode.custom,
				message: 'New Password & Confirm password must match',
				path: ['newPasswordConfirm']
			});
		}
	});

export const updateEmailSchema = zod.object({
	email: zod
		.string()
		.email({ message: 'Must be a valid email.' })
		.min(1, { message: 'Email is required' })
});

export const requestPasswordSchema = zod.object({
	email: zod
		.string()
		.email({ message: 'Must be a valid email.' })
		.min(1, { message: 'Email is required' })
});

export const registerUserSchema = zod
	.object({
		email: zod
			.string({ required_error: 'Email is required' })
			.email({ message: 'Email must be a valid email' }),
		name: zod
			.string({ required_error: 'Name is required' })
			.regex(/^[a-zA-z\s]*$/, { message: 'Name can only contain letters and spaces.' })
			.min(2, { message: 'Name must be at least 2 characters' })
			.max(64, { message: 'Name must be less than 64 characters' })
			.trim(),
		password: zod
			.string({ required_error: 'Password is required' })
			.regex(
				/^(?=.*?[a-z])(?=.*?[A-Z])(?=.*?[0-9])(?=.*?[!"#$%&'()*+,-./:;<=>?@[\]^_`{|}~])[a-zA-Z0-9!"#$%&'()*+,-./:;<=>?@[\]^_`{|}~]{8,}$/,
				{
					message:
						'Password must be a minimum of 8 characters & contain at least one upper and lower case letter, one number, and one special character.'
				}
			),
		passwordConfirm: zod.string({ required_error: 'Confirm Password is required' })
	})
	.superRefine(({ passwordConfirm, password }, ctx) => {
		if (passwordConfirm !== password) {
			ctx.addIssue({
				code: zod.ZodIssueCode.custom,
				message: 'Password & Confirm password must match',
				path: ['passwordConfirm']
			});
		}
	});
