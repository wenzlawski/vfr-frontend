<script lang="ts">
	import { onMount } from 'svelte';
	import StarterKit from '@tiptap/starter-kit';
	import { createEditor, Editor, EditorContent } from 'svelte-tiptap';
	import Placeholder from '@tiptap/extension-placeholder';
	import Highlight from '@tiptap/extension-highlight';
	import BubbleMenu from './tiptap/BubbleMenu.svelte';
	import type { Readable } from 'svelte/store';
	import { documentStore } from '$lib/stores/document';
	import { analysisStore } from '$lib/stores/analysis';
	import { ArgumentSpan } from '$lib/argumentHighlight';

	export let value: typeof documentStore;
	export let analysis: typeof analysisStore;

	let testcontent = `<p>This and that <span data-type="argumentspan">This is inside the span</span> last word</p>`;

	const args = [
		{
			text: {
				start: 0,
				span: 30
			},
			evidence: {
				start: 11,
				span: 10
			}
		},
		{
			text: {
				start: 22,
				span: 10
			},
			evidence: {
				start: 33,
				span: 10
			}
		},
		{
			text: {
				start: 44,
				span: 10
			},
			evidence: {
				start: 55,
				span: 10
			}
		}
	];

	$: {
		displayArguments($analysis?.arguments);
	}

	export function focus() {
		$editor.commands.focus();
	}

	let editor: Readable<Editor>;
	let timer: any;

	function getRandomLightHexColor(): string {
		let color = '#';
		for (let i = 0; i < 3; i++) {
			const channel = Math.floor(Math.random() * 60 + 186)
				.toString(16)
				.padStart(2, '0');
			color += channel;
		}
		return color;
	}

	function highlightArgument(start: number, end: number) {
		if (start === -1) return;
		$editor.commands.setTextSelection({ from: start, to: end });

		$editor.commands.setArgument({ color: getRandomLightHexColor(), id: 'test' });
		// $editor.chain().focus().toggleHighlight({ color: getRandomLightHexColor() }).run();
	}

	function displayArguments(args: any) {
		// display the arguments as highlights on the editor
		if ($editor == null) return;
		console.log('displaying arguments');
		for (let arg of args) {
			console.log(arg);
			highlightArgument(arg.text.start, arg.text.start + arg.text.span);
		}
		$editor.commands.setTextSelection(0);
	}

	const toolTip = (selection: { from: number; to: number }) => {
		clearTimeout(timer);
		timer = setTimeout(() => {
			// console.log('start,', sel.$anchor.pos, 'end,', sel.$head.pos);
			const { from, to } = selection;
			const text = $editor.state.doc.textBetween(from, to, ' ');
		}, 1000);
	};

	onMount(() => {
		editor = createEditor({
			extensions: [
				StarterKit,
				Placeholder.configure({
					placeholder: 'Start typing...'
				}),
				Highlight.configure({
					multicolor: true
				}),
				ArgumentSpan.configure({})
			],
			editorProps: {
				attributes: {
					class: 'leading-[1.85rem] focus:outline-none'
				}
			},
			editable: !$analysis.isRunning,
			content: $value.content,
			onUpdate({ editor }) {
				value.updateField({ content: editor.getText() });
			},
			onSelectionUpdate({ editor, transaction }) {
				if (transaction.selection.$anchor.pos !== transaction.selection.$head.pos) {
					toolTip(transaction.selection);
				} else {
					clearTimeout(timer);
					if (editor.isActive('argumentspan')) {
						console.log('on argument');
						editor.
					}
				}
			}
		});
	});
</script>

<div class="overflow-scroll">
	<button class="btn" on:click={() => displayArguments(args)}> Display </button>
	<button class="btn" on:click={() => $editor.commands.toggleHighlight()}> Highlight </button>
	<button class="btn" on:click={() => displayArguments($analysis.arguments)}> Arguments </button>
	<button
		class="btn"
		on:click={() =>
			$editor.commands.toggleArgument({ color: getRandomLightHexColor(), id: 'test' })}
	>
		Set arg
	</button>
	{#if editor}
		<BubbleMenu {editor} />
		{$editor.getHTML()}
	{/if}
	<EditorContent editor={$editor} />
</div>
