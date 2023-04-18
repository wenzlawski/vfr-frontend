<script lang="ts">
	import { BubbleMenu } from 'svelte-tiptap';

	export let editor;

	function handleAdd() {
		console.log('add');
	}
</script>

<BubbleMenu editor={$editor}>
	<div class="card bg-base-200 rounded-xl border border-base-300 ">
		<div class="flex justify-center tooltip m-0 cursor-pointer" data-tip="Add">
			<button on:click={handleAdd} class="btn btn-sm btn-ghost flex justify-center items-center">
				<ion-icon name="add-outline" size="large" />
			</button>
		</div>
	</div>
</BubbleMenu>

<!-- <style lang="scss">
	.square::before {
		content: '';
		position: absolute;
		bottom: -10px;
		left: 50%;
		transform: translateX(-50%);
		width: 0;
		height: 0;
		border-left: 20px solid transparent;
		border-right: 20px solid transparent;
		border-top: 10px solid grey;
	}
</style> -->
