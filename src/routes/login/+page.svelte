<script lang="ts">
  import { page } from '$app/stores';
  import { loginUserSchema } from '$lib/schemas';
  import { createForm } from 'felte';
  import { validator } from '@felte/validator-zod';
  import reporterDom from '@felte/reporter-dom';
  import { enhance } from '$app/forms';
  import { FormTextInput } from '$lib/components';
  import { signIn } from '@auth/sveltekit/client';
  const { form, errors, isSubmitting, isValid } = createForm({
    extend: [reporterDom(), validator({ schema: loginUserSchema })] // OR `extend: [validator],`
  });
</script>

<svelte:head>
  <title>Login - Readanalytics</title>
</svelte:head>

<div
  class="flex flex-col mt-32 items-center h-full w-full px-2 py-3 max-w-lg mx-auto"
>
  <!-- <form
		use:form
		use:enhance={({ cancel }) => {
			if (!$isValid) {
				cancel();
			}
		}}
		method="POST"
		class="flex flex-col items-center space-y-2 w-full pt-4"
	>
		<h2 class="mt-2 text-center text-3xl font-bold tracking-tight text-base-content">Login</h2>
		<FormTextInput name="email" label="Email" type="email" required errors={$errors} />

		<FormTextInput name="password" label="Password" type="password" required errors={$errors} />
		<p class="text-left mr-0">
			Forgot your password? <a class="text-blue-600" href="/reset-password">Reset it here</a>
		</p>

		<div class="w-full max-w-md pt-2">
			<button
				type="submit"
				class="btn btn-primary w-full block p-2 transition-colors hover:bg-blue-400"
				>{!$isSubmitting ? 'Login' : 'Loading...'}</button
			>
		</div>
	</form>
	<p>OR</p> -->
  <h1 class="text-3xl mb-3">Login</h1>
  {#each Object.keys($page.data.providers) as provider}
    <div class="w-full max-w-md pt-2">
      <button
        on:click={() => signIn($page.data.providers[provider].id)}
        class="btn btn-primary w-full block p-2 transition-colors hover:bg-blue-400"
        >Sign In with {$page.data.providers[provider].name}</button
      >
    </div>
  {/each}
  <p class="text-center mt-5">
    Don't have an account? <a class="text-blue-600" href="/register"
      >Register here</a
    >
  </p>
</div>
