<script lang="ts">
	import { enhance } from '$app/forms';
	import { invalidateAll } from '$app/navigation';
	import { Input, SidePane, ContentArea } from '$lib/components';
	import { Pane, Splitpanes } from 'svelte-splitpanes';

	// Ensure execution only on the browser, after the pouchdb script has loaded.
	// onMount(async function () {
	// 	var db = new PouchDB('my_database');
	// 	console.log({ PouchDB });
	// 	console.log({ db });
	// });

	export let data;
	export let form;
	let loading = false;
	let visible = true;

	const submitUpdateDocument = () => {
		loading = true;
		return async ({ result, update }) => {
			switch (result.type) {
				case 'success':
					await invalidateAll();
					break;
				case 'error':
					break;
				default:
					await update();
			}
			loading = false;
		};
	};
</script>

<svelte:head>
	<script src="//cdn.jsdelivr.net/npm/pouchdb@7.2.1/dist/pouchdb.min.js"></script>
</svelte:head>

<Splitpanes theme="modern-theme" horizontal={false}>
	<Pane minSize={20}>
		<form
			method="POST"
			action="?/updateDocument"
			class="space-y-2 w-full h-full items-center"
			enctype="multipart/form-data"
			use:enhance={submitUpdateDocument}
		>
			<Input id="title" label="Document title" value={data.document.title} />
			<ContentArea
				errors={undefined}
				id="content"
				label="Document content"
				value={data.document.content}
			/>
		</form>
	</Pane>
	<Pane snapSize={10} size={0}>
		<h2 style="margin: 0">This is a title</h2>

		<div class="entities" style="line-height: 2.5; direction: ltr">
			Asthmatic patients who were IgE sensitized to A fumigatus with a history of at least @ severe
			exacerbations in
			<mark
				class="entity"
				style="background: #bfe1d9; padding: 0.45em 0.6em; margin: 0 0.25em; line-height: 1; border-radius: 0.35em;"
			>
				the previous @ months
				<span
					style="font-size: 0.8em; font-weight: bold; line-height: 1; border-radius: 0.35em; vertical-align: middle; margin-left: 0.5rem"
					>DATE</span
				>
			</mark>
			were treated for @
			<mark
				class="entity"
				style="background: #bfe1d9; padding: 0.45em 0.6em; margin: 0 0.25em; line-height: 1; border-radius: 0.35em;"
			>
				months
				<span
					style="font-size: 0.8em; font-weight: bold; line-height: 1; border-radius: 0.35em; vertical-align: middle; margin-left: 0.5rem"
					>DATE</span
				>
			</mark>
			with @ mg of voriconazole twice daily , followed by observation for @
			<mark
				class="entity"
				style="background: #bfe1d9; padding: 0.45em 0.6em; margin: 0 0.25em; line-height: 1; border-radius: 0.35em;"
			>
				months
				<span
					style="font-size: 0.8em; font-weight: bold; line-height: 1; border-radius: 0.35em; vertical-align: middle; margin-left: 0.5rem"
					>DATE</span
				>
			</mark>
			, in a double-blind , placebo-controlled , randomized design .
		</div>
	</Pane>
</Splitpanes>

<style global lang="scss">
	.splitpanes.modern-theme {
		.splitpanes__splitter {
			background-color: #ccc;
			position: relative;

			&:before {
				content: '';
				position: absolute;
				left: 0;
				top: 0;
				transition: opacity 0.4s;
				background-color: #2db9d2;
				opacity: 0;
				z-index: 1;
			}
			&:hover:before {
				opacity: 1;
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
