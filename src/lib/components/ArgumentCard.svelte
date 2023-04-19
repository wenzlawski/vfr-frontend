<script lang="ts">
	export let argument: any;
</script>

<div class="overflow-x-hidden p-2 border card bg-base-200">
	<div>
		<h2 class="card-title">Claim</h2>
		<!-- <p>{argument.claim_score}</p> -->
		<p>{argument.claim}</p>
		{#if argument.evidence}
			<h2 class="card-title">Evidence</h2>
			<!-- <p>{argument.evidence_score}</p> -->
			<p>{argument.evidence || 'No evidence provided'}</p>
		{/if}
	</div>
</div>
