<script lang="ts">
	import { enhance } from '$app/forms';
	import DocCard from './DocCard.svelte';
	import { Modal } from '.';
	import { getNotificationsContext } from 'svelte-notifications';

	const { addNotification } = getNotificationsContext();
	let files;
	let input: HTMLInputElement;
	let modalOpen = false;
	let modalOpen2 = false;
	let m2;
</script>

<DocCard>
	<form method="POST" action="/documents?/create" use:enhance class="mt-3">
		<label>
			<button type="submit" class="text-xl font-bold">Create a new document</button>
		</label>
	</form>

	<div class="absolute bottom-0 border-t w-4/5 h-14">
		<div class="flex flex-row h-14 justify-center items-center space-x-4">
			<Modal label="upload" checked={modalOpen}>
				<div slot="trigger" class="hover:text-red-700 hover:font-bold">
					<div class="items-center flex-row flex text-md sm:text-lg">
						<ion-icon name="add-outline" size="large" />
						<span>File</span>
					</div>
				</div>
				<div slot="heading">
					<h3 class="text-2xl">Upload a file</h3>
				</div>
				<div slot="body">
					<form
						class="mt-8 space-y-3"
						method="POST"
						action="?/upload"
						use:enhance={({ form, data }) => {
							data.append('file', files[0]);
							return async ({ result }) => {
								if (result.type === 'error') {
									m2.close();
									addNotification({
										text: 'Could not upload file.',
										position: 'bottom-center',
										type: 'error',
										removeAfter: 5000
									});
								}
							};
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
			<Modal bind:this={m2} label="urlt" checked={modalOpen2}>
				<div slot="trigger" class="hover:text-red-700 hover:font-bold">
					<div class="flex flex-row items-center text-md sm:text-lg">
						<ion-icon name="add-outline" size="large" />
						<span>URL</span>
					</div>
				</div>
				<div slot="heading">
					<h3 class="text-2xl">Upload from url</h3>
				</div>
				<div slot="body">
					<form
						class="mt-8 space-y-3"
						method="POST"
						action="?/upload_url"
						use:enhance={({ form, data }) => {
							console.log('data', data);
							return async ({ result }) => {
								if (result.type === 'error') {
									m2.close();
									addNotification({
										text: 'Could not read URL text.',
										position: 'bottom-center',
										type: 'error',
										removeAfter: 5000
									});
								}
							};
						}}
					>
						<p class="text-base font-normal mt-2">Upload URL text to your documents.</p>
						<input
							type="text"
							name="url"
							placeholder="Type here"
							class="input input-bordered w-full max-w-xs"
						/>
						<div class="mt-6">
							<label for="urlt" class="btn btn-outline">Cancel</label>
							<button type="submit" class="btn btn-primary">Upload</button>
						</div>
					</form>
				</div>
				<div slot="actions">
					<!-- <button type="submit" class="btn btn-primary">Upload</button> -->
				</div>
			</Modal>
		</div>
	</div></DocCard
>
