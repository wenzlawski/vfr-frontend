<script lang="ts">
	import { enhance } from '$app/forms';
	import { PreviewTrashItem } from '$lib/components';
	export let data;
</script>

<svelte:head>
	<title>Trash - Readanalytics</title>
</svelte:head>

<div class="mt-8 ml-4 md:ml-14 flex flex-col gap-y-2">
	<h2 class="text-3xl font-bold">Trash</h2>
	<p>Documents in trash will be deleted within 30 days.</p>
	<!-- <form action="?/empty" use:enhance>
		<button type="submit" class="btn btn-primary w-fit">Empty Trash</button>
	</form> -->
</div>
<div class="mt-4 ml-2 md:ml-14 flex flex-col items-center">
	<div
		class="container pt-5 grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-5 justify-between gap-x-8 gap-y-6"
	>
		{#each data.documents as document (document.id)}
			<PreviewTrashItem {document} />
		{/each}
	</div>
</div>
