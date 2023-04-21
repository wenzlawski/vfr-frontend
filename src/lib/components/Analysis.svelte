<script lang="ts">
	import HelpDropdown from './HelpDropdown.svelte';

	export let analyze = (_model: string, _opts: any) => {};

	function analyzeHandler() {
		analyze(settings.model, settings);
	}

	let settings = {
		model: 'cnn',
		scope: 'sentence',
		context: 1,
		show_claims: true,
		show_premises: true,
		threshold: 0.5
	};
	let model = 'cnn';
	let context = 1;
</script>

<div class="mt-3 space-y-0">
	<div class="m-3">
		<h1 class="mb-2 text-xl">Annotations</h1>
		<div class="flex flex-row gap-x-2">
			<button class="btn btn-sm"> Zap </button>
			<button class="btn btn-sm"> Add </button>
			<!-- <button class="btn"> Analyze </button> -->
		</div>
	</div>
	<div class="divider" />
	<div class="collapse collapse-plus">
		<input type="checkbox" />
		<div class="text-lg collapse-title">Visual options</div>
		<div class="collapse-content">
			<label class="label">
				Show claims
				<input
					bind:checked={settings.show_claims}
					type="checkbox"
					class="checkbox"
					id="show-claim"
				/>
			</label>
			<label class="label">
				Show premises
				<input
					bind:checked={settings.show_premises}
					type="checkbox"
					class="checkbox"
					id="show-premise"
				/>
			</label>
		</div>
	</div>
	<div class="divider" />
	<div class="collapse collapse-plus">
		<input type="checkbox" checked />
		<div class="text-lg collapse-title">Model options</div>
		<div class="space-y-2 collapse-content">
			<label class="label">
				<div class="mr-1">
					AM model
					<HelpDropdown>
						<p class="">
							The type of model used. Learn more <a class="text-blue-800" href="/paper">here</a>
						</p>
					</HelpDropdown>
				</div>
				<select class="select select-bordered" bind:value={settings.model}>
					<option value="cnn" selected>CNN model</option>
					<option value="margot" selected>MARGOT API</option>
				</select>
			</label>
			<!-- <div class:disabled_area={model === 'margot'}> -->
			<!-- 	<label class="label"> -->
			<!-- 		<div> -->
			<!-- 			Analysis scope -->
			<!-- 			<HelpDropdown> -->
			<!-- 				<p class="">This is the analysis scope</p> -->
			<!-- 			</HelpDropdown> -->
			<!-- 		</div> -->
			<!-- 		<select class="select select-bordered" bind:value={scope} disabled={model === 'margot'}> -->
			<!-- 			<option value="sentence" selected>Sentence-level</option> -->
			<!-- 			<option value="paragraph">Paragraph-level</option> -->
			<!-- 			<option value="document">Document-level</option> -->
			<!-- 		</select> -->
			<!-- 	</label> -->
			<!-- 	{#if model === 'margot'} -->
			<!-- 		<p class="p-2 pt-0 text-sm text-gray-500"> -->
			<!-- 			Can only be set in Span-based or Graph-based model. -->
			<!-- 		</p> -->
			<!-- 	{/if} -->
			<!-- </div> -->
			<label class="label" for="th">
				<div>
					Argument threshold
					<HelpDropdown>
						<h2 class="">This is the argument threshold</h2>
					</HelpDropdown>
				</div>
				<b>{Math.round(settings.threshold * 100)}%</b>
			</label>
			<input
				name="th"
				bind:value={settings.threshold}
				type="range"
				min="0"
				max="1"
				step="0.05"
				class="range"
			/>
			<div class:disabled_area={settings.model !== 'cnn'}>
				<div class="mb-2">
					<label class="label" for="ct">
						<div>
							Context size
							<HelpDropdown>
								<h2>This is the context size.</h2>
								<p>Keep low in order to improve speed.</p>
							</HelpDropdown>
						</div>
						<div>
							<input
								class="text-xl text-right"
								name="ct"
								bind:value={settings.context}
								type="number"
								min="1"
								max="20"
								disabled={settings.model !== 'cnn'}
							/>
							<span class="text-sm">sentence(s)</span>
						</div>
					</label>
					{#if settings.model !== 'cnn'}
						<p class="p-2 pt-0 text-sm text-gray-500">
							Can only be set when the CNN model is selected.
						</p>
					{/if}
				</div>
			</div>
			<!-- class="range" -->
			<button class="w-full btn" on:click={() => analyzeHandler()}> Analyze </button>
		</div>
	</div>
	<div class="divider" />
	<div class="m-3">
		<h1 class="mb-2 text-xl">Analysis</h1>
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
