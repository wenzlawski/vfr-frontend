<script lang="ts">
	export let name;
	export let values;
</script>

<div class="flex flex-row gap-x-8">
	{#each values as value}
		<label class="flex flex-col items-center justify-center label cursor-pointer">
			<span class="label-text">{value}</span>
			<input type="radio" {name} class="radio" {value} />
		</label>
	{/each}
</div>
