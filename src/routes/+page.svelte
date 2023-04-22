<script lang="ts">
	import { page } from '$app/stores';
	import { signOut } from '@auth/sveltekit/client';
	import { Home } from '$lib/components';
</script>

<svelte:head>
	<title>Readanalytics</title>
	<meta name="description" content="Readanalytics" />
</svelte:head>

<section class="flex flex-col justify-center items-center flex-[80%]">
	<Home />

	<!-- <h1 class="text-3xl font-bold">Readanalytics</h1> -->
	<!-- <p> -->
	<!-- 	{#if Object.keys($page.data.session || {}).length} -->
	<!-- 		{#if $page.data.session?.user?.image} -->
	<!-- 			<span style="background-image: url('{$page.data.session.user.image}')" class="avatar" /> -->
	<!-- 		{/if} -->
	<!-- 		<span class="signedInText"> -->
	<!-- 			<small>Signed in as</small><br /> -->
	<!-- 			<strong>{$page.data.session?.user?.email || $page.data.session?.user?.name}</strong> -->
	<!-- 		</span> -->
	<!-- 		<button on:click={() => signOut()} class="button">Sign out</button> -->
	<!-- 	{:else} -->
	<!-- 		<span class="notSignedInText">You are not signed in</span> -->
	<!-- 		<a href="/auth/signin" class="button">Sign in</a> -->
	<!-- 	{/if} -->
	<!-- </p> -->
</section>
