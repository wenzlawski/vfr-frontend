<script lang="ts">
	// import './styles.css';
	import '../app.css';
	import Notifications from 'svelte-notifications';
	import { Footer, Navbar } from '$lib/components';
	import { page } from '$app/stores';
	import { validateUrl } from '$lib/helpers';
	// import { dev } from '$app/environment';
	// import { inject } from '@vercel/analytics';

	// inject({ mode: dev ? 'development' : 'production' });

	let route;
	let onFooter = ['/about', '/feedback'];
	let showFooter = true;

	$: route = $page.data.route?.id;
	$: showFooter = (route && validateUrl(route, onFooter)) || route === '/';
</script>

<Notifications>
	<div class="flex flex-col h-full flex-wrap min-h-screen">
		<Navbar>
			<main class="h-full flex-1 flex m-0 box-border items-stretch">
				<div class="grow items-stretch">
					<slot />
				</div>
			</main>
			{#if showFooter}
				<Footer />
			{:else}
				<div />
			{/if}
		</Navbar>
	</div>
</Notifications>
