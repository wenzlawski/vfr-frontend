<script lang="ts">
	import HelpDropdown from './HelpDropdown.svelte';

	export let analyze = () => {};

	let model = 'span';
	let scope = 'sentence';
	let threshold = 0.5;
	let context = 1;
</script>

<div class="mt-3 space-y-0">
	<div class="m-3">
		<h1 class="text-xl mb-2">Annotations</h1>
		<div class="flex flex-row gap-x-2">
			<button class="btn btn-sm"> Zap </button>
			<button class="btn btn-sm">add </button>
			<!-- <button class="btn "> Analyze </button> -->
		</div>
	</div>
	<div class="divider" />
	<div class="collapse collapse-plus">
		<input type="checkbox" />
		<div class="collapse-title text-lg">Visual options</div>
		<div class="collapse-content">
			<label class="label">
				Show claims
				<input type="checkbox" class="checkbox" id="show-claim" />
			</label>
			<label class="label">
				Show premises
				<input type="checkbox" class="checkbox" id="show-premise" />
			</label>
		</div>
	</div>
	<div class="divider" />
	<div class="collapse collapse-plus">
		<input type="checkbox" checked />
		<div class="collapse-title text-lg">Model options</div>
		<div class="collapse-content space-y-2">
			<label class="label">
				<div>
					Model type
					<HelpDropdown>
						<p class="">The type of model used. Learn more <a href="/paper">here</a></p>
					</HelpDropdown>
				</div>
				<select class="select select-bordered" bind:value={model}>
					<option value="span" selected>Span-based</option>
					<option value="graph">Graph-based</option>
				</select>
			</label>
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
			<button class="btn w-full" on:click={() => analyze()}> Analyze </button>
		</div>
	</div>
	<div class="divider" />
	<div class="m-3">
		<h1 class="text-xl mb-2">Analysis</h1>
		<div class="space-y-2">
			<button class="btn btn-sm"> Export </button>
			<button class="btn btn-sm"> Export all </button>
		</div>
	</div>
</div>

<style>
	.disabled_area {
		@apply bg-base-300;
		@apply rounded-lg;
	}
</style>
