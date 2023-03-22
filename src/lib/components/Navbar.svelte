<script lang="ts">
	import logo from '$lib/images/logo.svg';
	import { page } from '$app/stores';
	import { validateUrl } from '$lib/helpers';
	import { enhance, type SubmitFunction } from '$app/forms';
	import AccountDropdown from './AccountDropdown.svelte';
	import { redirect } from '@sveltejs/kit';
	let form;

	let route;
	let onAuth = ['/login', '/register', '/reset-password'];
	let onLogin = false;
	let checked: HTMLInputElement;

	$: route = $page.data.route.id;
	$: onLogin = route && validateUrl(route, onAuth);

	console.log($page.data.theme);

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

<div class="flex flex-col h-full">
	<div class="drawer">
		<input id="my-drawer" type="checkbox" class="drawer-toggle" bind:this={checked} />
		<div class="drawer-content flex flex-col">
			<!-- Navbar -->
			<header class="sticky shadow-sm top-0 bg-base-100 z-40">
				<nav class="navbar border-b bg-base-100 h-[4.5rem]">
					<div class="w-full navbar">
						<!-- Small format hamburger -->
						<div class="flex-none md:hidden">
							<label for="my-drawer" class="btn btn-square btn-ghost">
								<svg
									xmlns="http://www.w3.org/2000/svg"
									fill="none"
									viewBox="0 0 24 24"
									class="inline-block w-6 h-6 stroke-current"
									><path
										stroke-linecap="round"
										stroke-linejoin="round"
										stroke-width="2"
										d="M4 6h16M4 12h16M4 18h16"
									/></svg
								>
							</label>
						</div>
						<div class="flex-1 ml-3 ">
							<a class="mr-2 flex items-center " href="/">
								<img src={logo} alt="Home" class="h-10 w-10" />
								<span
									class="normal-case text-2xl mt-1 ml-2"
									style="font-family: 'Teko', sans-serif;">READANALYTICS</span
								>
							</a>
						</div>
						{#if !onLogin && $page.data.session}
							<div class="flex-none md:hidden pr-2">
								<AccountDropdown />
							</div>
						{/if}
						<div class="flex-none hidden md:block">
							<ul class="menu menu-horizontal">
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
													<form
														method="POST"
														action="/documents?/create"
														use:enhance
														class="mx-auto"
													>
														<label class=""
															>+ New
															<button type="submit" class="hidden" />
														</label>
													</form>
												</li>
												<li class="lg:pr-2">
													<AccountDropdown />
												</li>
											{:else}
												<li class="lg:pr-2">
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
																	selected={$page.data.theme === theme.value}
																>
																	{theme.name}
																</option>
															{/each}
														</select>
													</form>
												</li>
											{/if}
										</ul>
									</div>
								</div>
							</ul>
						</div>
					</div>
				</nav>
			</header>
			<slot />
		</div>
		<div class="drawer-side">
			<label for="my-drawer" class="drawer-overlay" />
			<ul class="menu w-60 bg-base-100 p-2 pt-1">
				<li>
					<label for="my-drawer">
						<ion-icon name="close-outline" size="large" />
					</label>
				</li>
				<li>
					<a
						on:click={() => {
							checked.click();
						}}
						class=""
						href="/"
					>
						Home
					</a>
				</li>
				<li>
					<a
						on:click={() => {
							checked.click();
						}}
						class=""
						href="/about"
					>
						About
					</a>
				</li>
				<li>
					<a
						on:click={() => {
							checked.click();
						}}
						class=""
						href="/paper"
					>
						Paper
					</a>
				</li>
				{#if !onLogin && $page.data.session}
					<li>
						<a
							on:click={() => {
								checked.click();
							}}
							class=""
							href="/documents"
						>
							Documents
						</a>
					</li>
				{/if}
			</ul>
		</div>
	</div>
</div>
