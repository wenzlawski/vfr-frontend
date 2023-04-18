<script lang="ts">
	export let cards: any;
</script>

<div class="flex justify-center items-center mt-20">
	<div
		class="inline-block w-8 h-8 rounded-full border-4 border-current border-solid animate-spin border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"
		role="status"
	>
		<span
			class="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]"
			>Loading...</span
		>
	</div>
</div>

<div class="overflow-y-scroll p-2 space-y-2 h-full">
	{#each $cards as card}
		<div class="overflow-x-hidden p-2 border card bg-base-200">
			<div>
				<h2 class="card-title">Premise</h2>
				<p class="card-text">{card.premise}</p>
				<h2 class="card-title">Claim</h2>
				<p class="card-text">{card.claim}</p>
			</div>
		</div>
	{/each}
</div>
