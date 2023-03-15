<script lang="ts">
	import { enhance } from '$app/forms';
	import DocCard from './DocCard.svelte';
	import toast from 'svelte-french-toast';
	let modalOpen;
</script>

<DocCard>
	<form slot="body" method="POST" action="/documents?/create" use:enhance class="mx-auto">
		<!-- <input type="hidden" name="type" value="document" /> -->
		<button type="submit" class="text-lg">Create a new document</button>
	</form>
</DocCard>
