<script lang="ts">
	import { page } from '$app/stores';
	import { signIn, signOut } from '@auth/sveltekit/client';
	import Tiptap from '$lib/components/Tiptap.svelte';
</script>

<svelte:head>
	<title>Readanalytics</title>
	<meta name="description" content="Natural Language App" />
</svelte:head>

<section class="flex flex-col justify-center items-center flex-[60%]">
	<h1 class="text-3xl font-bold">Welcome</h1>
	<p>
		{#if Object.keys($page.data.session || {}).length}
			{#if $page.data.session?.user?.image}
				<span style="background-image: url('{$page.data.session.user.image}')" class="avatar" />
			{/if}
			<span class="signedInText">
				<small>Signed in as</small><br />
				<strong>{$page.data.session?.user?.email || $page.data.session?.user?.name}</strong>
			</span>
			<button on:click={() => signOut()} class="button">Sign out</button>
		{:else}
			<span class="notSignedInText">You are not signed in</span>
			<a href="/auth/signin" class="button">Sign in</a>
		{/if}
	</p>

	<Tiptap />
</section>
