<script lang="ts">
	let threshold = 0.5;

	$: Math.round(threshold);
</script>

<div class="h-full">
	<div class="m-5 mt-0 pt-5 space-y-2">
		<label class="label">
			Analysis scope
			<select class="select select-bordered">
				<option>Sentence-level</option>
				<option>Paragraph-level</option>
				<option>Document-level</option>
			</select>
		</label>
		<div class="form-control w-full">
			<label class="label" for="th">
				Argument threshold <b>{Math.round(threshold * 100)}%</b>
			</label>
			<input
				name="th"
				bind:value={threshold}
				type="range"
				min="0"
				max="1"
				step="0.05"
				class="range"
			/>
		</div>
		<button class="btn w-full"> Analyze </button>
		<div class="divider" />
		<span class="text-xl text-gray-500">This is the analysis result.</span>
	</div>
</div>
