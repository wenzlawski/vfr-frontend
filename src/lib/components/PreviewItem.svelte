<script lang="ts">
	import type TextDocument from '$lib/models/document';
	export let document;
	let modalOpen;
	$: modalOpen = false;
</script>

<div
	class="card bg-base-100 justify-center justify-self-center shadow-lg border-solid h-48 border-2 border-indigo-600 w-4/5 hover:border-primary"
>
	{console.log(JSON.stringify(document))}
	<a href="/documents/{document.id}">
		<!-- <figure><img src="/images/stock/photo-1606107557195-0e29a4b5b4aa.jpg" alt="Shoes" /></figure> -->
		<p class="text-[0.5rem] px-8 py-5 hover:no-underline">
			<!-- {document.content.substring(0, 500)} -->
			{document.content}
		</p>
		<div class="card-body">
			<h2 class="card-title">
				{document.title}
			</h2>
		</div>
	</a>
</div>

<!-- <div class="w-full h-28 flex items-center justify-between">
	<div class="flex flex-col w-full ml-4 h-full justify-center">
		<a href="/documents/{document.id}" class="font-semibold text-lg">{document.title}</a>
	</div>
	<div class="flex items-center justify-end w-full">
		<a href="/documents/{document.id}/edit" class="btn btn-outline">Edit Document</a>
		<Modal label={document.id} checked={modalOpen}>
			<span slot="trigger" class="btn btn-error ml-2">Delete</span>
			<div slot="heading">
				<h3 class="text-2xl">Delete {document.title}</h3>
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
</div> -->
