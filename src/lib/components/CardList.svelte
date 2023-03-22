<script lang="ts">
	export let cards;
</script>

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
