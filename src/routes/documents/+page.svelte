<script lang="ts">
	import { enhance } from '$app/forms';
	import { PreviewItem, PreviewItemNew } from '$lib/components';
	import Modal from '$lib/components/Modal.svelte';
	export let data;

	let files;
	let input: HTMLInputElement;
	let modalOpen = false;
	let modalOpen2 = false;
</script>

<h2 class="text-3xl font-bold pt-3 pl-3">My Documents</h2>
<div class="w-full mt-4 flex flex-col items-center">
	<div class="space-x-5 mb-3">
		<Modal label="upload" checked={modalOpen}>
			<p slot="trigger" class="btn btn-primary max-w-md mt-4">Upload a file</p>
			<div slot="heading">
				<h3 class="text-2xl">Upload a file</h3>
				<form
					class="mt-8 space-y-3"
					method="POST"
					action="?/upload"
					use:enhance={({ form, data }) => {
						data.append('file', files[0]);
					}}
				>
					<p class="text-base font-normal mt-2">Upload a file to your documents.</p>
					<input
						type="file"
						class="file-input file-input-bordered file-input-primary w-full max-w-xs"
						bind:this={input}
						bind:files
					/>
					<div class="mt-5">
						<label for="upload" class="btn btn-outline">Cancel</label>
						<button type="submit" class="btn btn-primary">Upload</button>
					</div>
				</form>
			</div>
			<div slot="actions">
				<!-- <button type="submit" class="btn btn-primary">Upload</button> -->
			</div>
		</Modal>
		<Modal label="url" checked={modalOpen2}>
			<p slot="trigger" class="btn btn-primary max-w-md mt-4">Upload from url</p>
			<div slot="heading">
				<h3 class="text-2xl">Upload from url</h3>
				<form class="mt-8 space-y-3" method="POST" action="?/upload_url" use:enhance>
					<p class="text-base font-normal mt-2">Upload URL text to your documents.</p>
					<input type="text" placeholder="Type here" class="input input-bordered w-full max-w-xs" />
					<div class="mt-5">
						<label for="url" class="btn btn-outline">Cancel</label>
						<button type="submit" class="btn btn-primary">Upload</button>
					</div>
				</form>
			</div>
			<div slot="actions">
				<!-- <button type="submit" class="btn btn-primary">Upload</button> -->
			</div>
		</Modal>
	</div>
	<div class="container m-auto grid grid-cols-2 gap-x-12 gap-y-8 justify-center">
		<PreviewItemNew />
		{#each data.documents as document (document.id)}
			<PreviewItem {document} />
		{/each}
	</div>
</div>
