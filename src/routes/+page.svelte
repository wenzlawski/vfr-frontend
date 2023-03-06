<script>
	export let data;
</script>

<svelte:head>
	<title>Home</title>
	<meta name="description" content="Natural Language App" />
</svelte:head>

<section class="flex flex-col justify-center items-center flex-[60%]">
	<h1 class="text-3xl font-bold">Welcome</h1>
	{#if !data.user}
		<a href="/login" class="btn btn-primary">Login</a>
	{/if}
</section>
