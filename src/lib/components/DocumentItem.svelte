<script>
	import { enhance } from '$app/forms';
	import { Modal } from '$lib/components';
	import toast from 'svelte-french-toast';
	export let document;
	let modalOpen;
	let loading = false;
	const submitDeleteDocument = () => {
		loading = true;
		return async ({ result, update }) => {
			switch (result.type) {
				case 'success':
					toast.success('Document deleted successfully!');
					await update();
					break;
				case 'error':
					toast.error('Could not delete document. Try again later.');
					break;
				default:
					await update();
			}
			loading = false;
		};
	};
	$: modalOpen = false;
</script>

<div class="w-full h-28 flex items-center justify-between">
	<div class="flex flex-col w-full ml-4 h-full justify-center">
		<a href="/documents/{document.id}" class="font-semibold text-lg">{document.title}</a>
	</div>
	<div class="flex items-center justify-end w-full">
		<a href="/documents/{document.id}/edit" class="btn btn-outline">Edit Document</a>
		<Modal label={document.id} checked={modalOpen}>
			<span slot="trigger" class="btn btn-error ml-2">Delete</span>
			<div slot="heading">
				<h3 class="text-2xl">Delete {document.name}</h3>
				<p class="text-base font-normal mt-2">
					Are you sure you want to delete this document? Once deleted, the document cannot be
					restored.
				</p>
			</div>
			<div slot="actions" class="flex w-full items-center justify-center space-x-2">
				<label for={document.id} class="btn btn-outline">Cancel</label>
				<form action="?/deleteDocument" method="POST" use:enhance={submitDeleteDocument}>
					<input type="hidden" name="id" value={document.id} />
					<button type="submit" class="btn btn-error" disabled={loading}>Delete</button>
				</form>
			</div>
		</Modal>
	</div>
</div>
