<script lang="ts">
	import { enhance } from '$app/forms';
	import { Input, TitleInput } from '$lib/components';
	import Tiptap from '$lib/components/Tiptap.svelte';
	import { Pane, Splitpanes } from 'svelte-splitpanes';

	export let data;
	let timer;

	console.log('data', data);

	function handleResize(event) {
		console.log('event', event);
		updateFn({ tabSize: event.detail[1].size });
	}

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

	function refocusOnEditor() {
		console.log('refocusOnEditor');
	}
</script>

<Splitpanes theme="modern-theme" horizontal={false} on:resized={handleResize}>
	<Pane minSize={20}>
		<div class="ml-14 mr-10 mt-8 mb-[10%] h-full">
			<TitleInput content={data.document._doc.title} {update} {refocusOnEditor} />
			<Tiptap value={data.document._doc.content} {update} />
		</div>
	</Pane>
	<Pane snapSize={10} size={data.document._doc.tabSize || 0} />
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
