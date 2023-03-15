<script lang="ts">
	import { enhance } from '$app/forms';
	import { Input, TitleInput } from '$lib/components';
	import Tiptap from '$lib/components/Tiptap.svelte';
	import { Pane, Splitpanes } from 'svelte-splitpanes';

	export let data;
	let timer;

	console.log('data', data);

	const update = (docData) => {
		clearTimeout(timer);
		timer = setTimeout(() => {
			console.log('debounced');
			updateFn(docData);
		}, 1000);
	};

	function updateFn(docdata) {
		console.log('updateFn');
		fetch(`/api/documents/${data.id}`, {
			method: 'POST',
			body: JSON.stringify(docdata)
		});
	}
</script>

<svelte:head>
	<script src="//cdn.jsdelivr.net/npm/pouchdb@7.2.1/dist/pouchdb.min.js"></script>
</svelte:head>

<TitleInput content={data.document._doc.title} {update} />
<Splitpanes theme="modern-theme" horizontal={false}>
	<Pane minSize={20}>
		<form
			method="POST"
			action="?/updateDocument"
			class="space-y-2 w-full h-full items-center"
			enctype="multipart/form-data"
			use:enhance
		>
			<Tiptap value={data.document._doc.content} {update} />
		</form>
	</Pane>
	<Pane snapSize={10} size={0} />
</Splitpanes>

<style global lang="scss">
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
