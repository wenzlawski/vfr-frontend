<script lang="ts">
	import { enhance } from '$app/forms';
	import DocCard from './DocCard.svelte';
	export let document;
	$: modalOpen = false;
	import { getNotificationsContext } from 'svelte-notifications';

	const { addNotification } = getNotificationsContext();
</script>

<DocCard>
	<a href="/documents/{document.id}" class="w-full overflow-hidden text-ellipsis">
		<!-- <figure><img src="/images/stock/photo-1606107557195-0e29a4b5b4aa.jpg" alt="Shoes" /></figure> -->
		<h2 class="text-lg font-semibold mb-1 truncate w-auto">
			{document.title !== '' ? document.title : 'Untitled document'}
		</h2>
		<p class="overflow-hidden text-justify text-xs">{document.content}</p>
	</a>
	<div
		class="absolute bottom-0 bg-base-100 w-full border-t py-2 flex justify-center items-center flex-row"
	>
		<form
			method="POST"
			use:enhance={() => {
				return async ({ result, update }) => {
					await update();

					if (result.type === 'success') {
						addNotification({
							text: `Document ${result.data?.message}!`,
							position: 'bottom-center',
							type: 'success',
							removeAfter: 2000
						});
					} else {
						addNotification({
							text: 'Error performing action.',
							position: 'bottom-center',
							type: 'error',
							removeAfter: 2000
						});
					}
				};
			}}
		>
			<input type="hidden" name="id" value={document.id} />
			<div class="h-14 flex justify-center items-center gap-x-8">
				<div class="tooltip" data-tip="Download">
					<button type="submit" formaction="?/download" class="btn btn-square btn-outline">
						<ion-icon name="download-outline" size="large" />
					</button>
				</div>
				<div class="tooltip" data-tip="Download">
					<button type="submit" formaction="?/download" class="btn btn-square btn-outline">
						<ion-icon name="trash-outline" size="large" />
					</button>
				</div>
			</div>
		</form>
	</div>
</DocCard>
