<script lang="ts">
	import { page } from '$app/stores';
	import { enhance, type SubmitFunction } from '$app/forms';
	let form;

	const themes = [
		{
			name: 'Light',
			value: 'light'
		},
		{
			name: 'Dark',
			value: 'dark'
		},
		{
			name: 'System',
			value: 'system'
		}
	];

	const submitUpdateTheme: SubmitFunction = ({ data }) => {
		const theme = data.get('theme') as string;

		if (theme !== 'system') {
			document.documentElement.setAttribute('data-theme', theme);
		}
	};
</script>

<div class="dropdown inline-block dropdown-end ">
	<!-- svelte-ignore a11y-no-noninteractive-tabindex -->
	<!-- svelte-ignore a11y-label-has-associated-control -->
	<label tabindex="0" class="btn btn-ghost btn-circle avatar">
		<div class="w-10 rounded-full">
			<img
				src={$page.data.session?.user?.image ||
					`https://ui-avatars.com/api/?name=${$page.data.session?.user?.name}`}
				alt="User avatar"
			/>
		</div>
	</label>
	<!-- svelte-ignore a11y-no-noninteractive-tabindex -->
	<ul
		tabindex="0"
		class="menu dropdown-content bg-base-100 mt-3 p-2 shadow-xl rounded-box w-52 z-50"
	>
		<li>
			<a href="/documents" class="justify-between">My Documents</a>
		</li>
		<li><a href="/settings">Settings</a></li>
		<li><a href="/feedback">Feedback</a></li>
		<li>
			<form action="/auth/signout" method="POST">
				<button type="submit" class="w-full text-start">Logout</button>
			</form>
		</li>
		<li>
			<form method="POST" action="/?/switchTheme" bind:this={form} use:enhance={submitUpdateTheme}>
				<select name="theme" class="select w-full max-w-xs" on:change={() => form.requestSubmit()}>
					{#each themes as theme}
						<option value={theme.value} selected={$page.data.session?.user?.theme === theme.value}>
							{theme.name}
						</option>
					{/each}
				</select>
			</form>
		</li>
	</ul>
</div>
