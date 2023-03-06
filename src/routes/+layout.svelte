<script>
	// import './styles.css';
	import '../app.css';
	import { Toaster } from 'svelte-french-toast';
	import { Footer, Navbar } from '$lib/components';
	import { page } from '$app/stores';
	import { validateUrl } from '$lib/helpers';
	import { theme } from '$lib/theme';

	let route;
	let onFooter = ['/about'];
	let showFooter = true;

	$: route = $page.data.route.id;
	$: showFooter = validateUrl(route, onFooter) || route === '/';
</script>

<div class="flex flex-col h-full flex-wrap min-h-screen w-full" data-theme={$theme}>
	<header class="sticky shadow-sm top-0 bg-base-100">
		<Navbar />
	</header>
	<main
		class="h-full min-h-full flex-1 flex w-full min-w-full my-0 mx-auto box-border items-stretch"
	>
		<div class="mx-auto grow items-stretch">
			<slot />
		</div>
	</main>

	{#if showFooter}
		<Footer />
	{:else}
		<div />
	{/if}
</div>
