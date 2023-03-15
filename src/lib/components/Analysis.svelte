<script lang="ts">
	import HelpDropdown from './HelpDropdown.svelte';

	let scope = 'sentence';
	let threshold = 0.5;
	let context = 1;
</script>

<div class="h-full">
	<div class="m-5 mt-0 pt-5 space-y-2">
		<label class="label">
			<div>
				Analysis scope
				<HelpDropdown>
					<p class="">This is the analysis scope</p>
				</HelpDropdown>
			</div>
			<select class="select select-bordered" bind:value={scope}>
				<option value="sentence" selected>Sentence-level</option>
				<option value="paragraph">Paragraph-level</option>
				<option value="document">Document-level</option>
			</select>
		</label>
		<div class="form-control w-full">
			<label class="label" for="th">
				<div>
					Argument threshold
					<HelpDropdown>
						<h2 class="">This is the argument threshold</h2>
					</HelpDropdown>
				</div>
				<b>{Math.round(threshold * 100)}%</b>
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
		<div class:disabled_area={scope === 'sentence'}>
			<div class="mb-2">
				<label class="label" for="ct">
					<div>
						Context size
						<HelpDropdown>
							<h2 class="">This is the context size</h2>
						</HelpDropdown>
					</div>
					<div>
						<input
							class="text-xl text-right"
							name="ct"
							bind:value={context}
							type="number"
							min="1"
							max="20"
							disabled={scope === 'sentence'}
						/>
						<span>words</span>
					</div>
				</label>
				{#if scope === 'sentence'}
					<p class="text-sm p-2 pt-0 text-gray-500">
						Can only be set in paragraph and document scope.
					</p>
				{/if}
			</div>
		</div>
		<!-- class="range" -->
		<button class="btn w-full"> Analyze </button>
		<div class="divider" />
		<span class="text-xl text-gray-500">This is the analysis result.</span>
	</div>
</div>

<style>
	.disabled_area {
		@apply bg-gray-200;
		@apply rounded-md;
	}
</style>
