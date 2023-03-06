<script lang="ts">
	import { enhance } from '$app/forms';
	import { FormTextInput } from '$lib/components';
	import { registerUserSchema } from '$lib/schemas';
	import reporterDom from '@felte/reporter-dom';
	import { validator } from '@felte/validator-zod';
	import { createForm } from 'felte';
	import type { z } from 'zod';

	const { form, errors, isSubmitting, isValid } = createForm<z.infer<typeof registerUserSchema>>({
		extend: [validator({ schema: registerUserSchema }), reporterDom()] // OR `extend: [validator],`
	});
</script>

<div class="flex flex-col mt-32 items-center h-full w-full px-2 py-3 max-w-lg mx-auto">
	<form
		use:form
		use:enhance={({ cancel }) => {
			if (!$isValid) {
				cancel();
			}
		}}
		method="POST"
		class="flex flex-col items-center space-y-2 w-full pt-4"
	>
		<h2 class="mt-2 text-center text-3xl font-bold tracking-tight text-base-content">
			Registration
		</h2>
		<FormTextInput name="email" label="Email" type="email" required errors={$errors} />
		<FormTextInput name="username" label="Username" type="username" required errors={$errors} />
		<FormTextInput name="name" label="Name" type="name" required errors={$errors} />
		<FormTextInput name="password" label="Password" type="password" required errors={$errors} />
		<FormTextInput
			name="passwordConfirm"
			label="Confirm Password"
			type="passwordConfirm"
			required
			errors={$errors}
		/>

		<div class="w-full max-w-md pt-2">
			<button
				type="submit"
				class="btn btn-primary w-full block p-2 transition-colors hover:bg-blue-400"
				>{!$isSubmitting ? 'Register' : 'Loading...'}</button
			>
		</div>
	</form>
	<p>Already have an account? <a class="text-blue-600" href="/login">Login here</a></p>
</div>
