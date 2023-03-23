<script lang="ts">
	export let cards;
</script>

<div class="flex items-center justify-center mt-20">
	<div
		class="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"
		role="status"
	>
		<span
			class="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]"
			>Loading...</span
		>
	</div>
</div>

<div class="space-y-2 p-2 h-full overflow-y-scroll">
	{#each $cards as card}
		<div class="card bg-base-200 border p-2 overflow-x-hidden">
			<div>
				<h2 class="card-title">Premise</h2>
				<p class="card-text">{card.premise}</p>
				<h2 class="card-title">Claim</h2>
				<p class="card-text">{card.claim}</p>
			</div>
		</div>
	{/each}
</div>
