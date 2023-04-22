<script lang="ts">
	import type { ArgumentInstance } from '$lib/stores/analysis';

	export let argument: ArgumentInstance;

	let decimals = 2;
	const confidence = argument.confidence.toFixed(decimals);
	const sufficiency = argument.sufficiency.toFixed(decimals);
</script>

<div class="overflow-x-hidden rounded-md p-2 border card bg-base-200">
	<div>
		<p class="text-sm text-justify">{argument.text.slice(0, 70) + '...'}</p>
		<div class="flex flex-row gap-x-4">
			<p>Confidence: {confidence}</p>
			<p>Sufficiency: {sufficiency}</p>
		</div>
	</div>
</div>
