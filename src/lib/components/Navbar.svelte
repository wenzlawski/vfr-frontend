<script lang="ts">
	import logo from '$lib/images/logo.svg';
	import { page } from '$app/stores';
	import { validateUrl } from '$lib/helpers';
	import { enhance, type SubmitFunction } from '$app/forms';
	let form;

	let route;
	let onAuth = ['/login', '/register', '/reset-password'];
	let onLogin = false;

	$: route = $page.data.route.id;
	$: onLogin = route && validateUrl(route, onAuth);

	console.log($page.data.session?.user);

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

<nav class="navbar border-b bg-base-100 h-[4.5rem]">
	<div class="flex-1 ml-3">
		<a class="mr-2 flex items-center " href="/">
			<img src={logo} alt="Home" class="h-10 w-10" />
			<span class="normal-case text-2xl mt-1 ml-2" style="font-family: 'Teko', sans-serif;"
				>READANALYTICS</span
			>
		</a>
	</div>

	<!-- Right elements -->
	<div class="relative flex items-center">
		<!-- Icon -->
		<div class="flex-none">
			<ul class="menu menu-horizontal">
				<li class="lg:pr-2">
					<a class="" href="/about">About</a>
				</li>
				<li class="lg:pr-2">
					<a class="" href="/paper">Paper</a>
				</li>
				{#if !onLogin && $page.data.session}
					<li class="lg:pr-2">
						<a class="" href="/documents">Documents</a>
					</li>
					<li class="lg:pr-2">
						<form method="POST" action="/documents?/create" use:enhance class="mx-auto">
							<label class=""
								>+ New
								<button type="submit" class="hidden" />
							</label>
						</form>
					</li>
					<li class="lg:pr-2">
						<div class="dropdown inline-block dropdown-end ">
							<!-- svelte-ignore a11y-no-noninteractive-tabindex -->
							<!-- svelte-ignore a11y-label-has-associated-control -->
							<label tabindex="0" class="btn btn-ghost btn-circle avatar">
								<div class="w-10 rounded-full">
									<img
										src={$page.data.session.user?.image ||
											`https://ui-avatars.com/api/?name=${$page.data.session.user?.name}`}
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
								<li>
									<form action="/auth/signout" method="POST">
										<button type="submit" class="w-full text-start">Logout</button>
									</form>
								</li>
								<li>
									<form
										method="POST"
										action="/?/switchTheme"
										bind:this={form}
										use:enhance={submitUpdateTheme}
									>
										<select
											name="theme"
											class="select w-full max-w-xs"
											on:change={() => form.requestSubmit()}
										>
											{#each themes as theme}
												<option
													value={theme.value}
													selected={$page.data.session.user?.theme === theme.value}
												>
													{theme.name}
												</option>
											{/each}
										</select>
									</form>
								</li>
							</ul>
						</div>
					</li>
				{/if}
			</ul>
		</div>
	</div>
</nav>
