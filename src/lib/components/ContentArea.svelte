<script lang="ts">
	export let value = '';
	export let placeholder = '';
	export let id;
	export let label;
	// export let type = 'text';
	export let disabled = false;
	export let required = false;
	export let errors;
</script>

<div class="form-control w-full h-full ">
	<label for={id} class="label font-medium pb-1">
		<span class="label-text">{label}</span>
	</label>
	<textarea
		class="textarea resize-none h-full text-lg leading-tight"
		{placeholder}
		{required}
		{disabled}
		{id}
		name={id}
		{value}
	/>
	{#if errors}
		{#each errors as error}
			<label for={id} class="label py-0 pt-1">
				<span class="label-text-alt text-error">
					{error}
				</span>
			</label>
		{/each}
	{/if}
</div>
