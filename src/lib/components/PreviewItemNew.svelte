<script lang="ts">
	import { enhance } from '$app/forms';
	import DocCard from './DocCard.svelte';
	import toast from 'svelte-french-toast';
	let modalOpen;
</script>

<DocCard>
	<form method="POST" action="/documents?/create" use:enhance class="mx-auto">
		<!-- <input type="hidden" name="type" value="document" /> -->
		<label>
			<!-- <ion-icon name="create-outline" class="text-[3rem]" /> -->
			<button type="submit" class="text-lg">Create a new document</button>
		</label>
	</form>
</DocCard>
