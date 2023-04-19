<script lang="ts">
	import { Analysis, TitleInput } from '$lib/components';
	import CardList from '$lib/components/CardList.svelte';
	import Tiptap from '$lib/components/Tiptap.svelte';
	import { Pane, Splitpanes } from 'svelte-splitpanes';
	import { writable } from 'svelte/store';
	import { parseMargot } from '$lib/utils';
	import type { PageData } from './$types';
	import { documentStore } from '$lib/stores/document';
	import { analysisStore } from '$lib/stores/analysis';

	export let data: PageData;
	let editor;

	let docStore = documentStore;
	data.document.document._doc._id = data.document.id;
	docStore.init(data.document.document._doc);

	let pane = writable($docStore.tabSize || 0);

	let anaStore = analysisStore;

	let hasAnalysis = false; // set to true if analysis is available

	function analyze(model: string, opts: any) {
		anaStore.init();
		switch (model) {
			case 'margot':
				console.log("margot's model");
				fetch('/api/models/margot', {
					method: 'POST',
					body: JSON.stringify({ text: $docStore.content, opts })
				})
					.then((res) => {
						console.log('res', res);
						return res.json();
					})
					.then((data) => {
						// Consuming the response data
						console.log('data', data);
						anaStore.setArguments(parseMargot($docStore.content, data.response.document));
						editor.console.log('arguments', $anaStore.arguments);
					});
				break;
			case 'span':
				console.log('span');
				break;
			case 'graph':
				console.log('graph');
				break;
			default:
				console.log('default');
				break;
		}
		hasAnalysis = true;
	}

	function handleResized(size: any) {
		docStore.updateField({ tabSize: size });
		$pane = size;
	}

	function refocusOnEditor() {
		editor.focus();
	}
</script>

<svelte:head>
	{#await data.document}
		<title>{'Loading'} - Readanalytics</title>
	{:then document}
		<title>{$docStore.title} - Readanalytics</title>
	{/await}
</svelte:head>

<Splitpanes
	on:resized={(event) => handleResized(event.detail[event.detail.length - 1].size)}
	on:resize={(event) => ($pane = event.detail[event.detail.length - 1].size)}
	theme="modern-theme"
	horizontal={false}
>
	<Pane minSize={20}>
		<div class="justify-center px-4 mx-auto mt-8 md:max-w-2xl xl:max-w-3xl">
			{#await data.document}
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
			{:then document}
				<TitleInput content={docStore} />
				<Tiptap bind:this={editor} analysis={anaStore} value={docStore} />
			{/await}
		</div>
		<div class:hidden={$pane !== 0} class="absolute right-0 mr-3 -translate-y-7 top-[6.5rem]">
			<div class="flex justify-center items-center h-full">
				<div class="flex flex-col justify-center items-center">
					<button
						class="btn btn-sm"
						on:click={() => {
							$pane = 40;
							handleResized(40);
						}}>Analyze the text</button
					>
				</div>
			</div>
		</div></Pane
	>
	{#if hasAnalysis}
		<Pane snapSize={10} size={15}>
			<CardList analysis={anaStore} content={$docStore.content} />
		</Pane>
	{/if}
	<Pane snapSize={10} size={$pane}>
		<Analysis {analyze} />
	</Pane>
</Splitpanes>

<style global lang="scss">
	/* Placeholder (at the top) */
	.ProseMirror p.is-editor-empty:first-child::before {
		content: attr(data-placeholder);
		float: left;
		color: #adb5bd;
		pointer-events: none;
		height: 0;
	}

	.splitpanes.modern-theme {
		.splitpanes__splitter {
			background-color: #ccc;
			position: relative;
			// width: 0.2rem;

			&:before {
				content: '';
				position: absolute;
				left: 0;
				top: 0;
				transition: opacity 0.4s, width 0.4s;
				background-color: #2db9d2;
				opacity: 0;
				z-index: 1;
			}
			&:hover:before {
				opacity: 1;
				width: 0.4rem;
			}
			&.splitpanes__splitter__active {
				z-index: 2; /* Fix an issue of overlap fighting with a near hovered splitter */
			}
		}
	}
	.modern-theme {
		&.splitpanes--vertical > .splitpanes__splitter:before {
			left: -3px;
			right: -3px;
			height: 100%;
			cursor: col-resize;
		}
		&.splitpanes--horizontal > .splitpanes__splitter:before {
			top: -3px;
			bottom: -3px;
			width: 100%;
			cursor: row-resize;
		}
	}

	.splitpanes.no-splitter {
		.splitpanes__pane {
			background-color: #f8f8f8;
		}
		.splitpanes__splitter {
			background-color: #ccc;
			position: relative;
		}
	}
	.no-splitter {
		&.splitpanes--horizontal > .splitpanes__splitter:before {
			width: 0.125rem;
			pointer-events: none;
			cursor: none;
		}
		&.splitpanes--vertical > .splitpanes__splitter:before {
			height: 0.125rem;
			pointer-events: none;
			cursor: none;
		}
	}
</style>
