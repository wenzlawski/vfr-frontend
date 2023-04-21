<script lang="ts">
	import { onMount } from 'svelte';
	import StarterKit from '@tiptap/starter-kit';
	import type { Editor as EditorBase } from '@tiptap/core';
	import { createEditor, Editor, EditorContent } from 'svelte-tiptap';
	import Placeholder from '@tiptap/extension-placeholder';
	import Highlight from '@tiptap/extension-highlight';
	import BubbleMenu from './tiptap/BubbleMenu.svelte';
	import type { Readable } from 'svelte/store';
	import type { documentStore } from '$lib/stores/document';
	import type { analysisStore } from '$lib/stores/analysis';
	import { Arguments } from '$lib/arguments';
	import { getRandomLightHexColor } from '$lib/utils';

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

	let showArgumentMenu = false;
	let isArgumentModeOn = false;
	let isTextSelected = false;
	let showAddArgumentSection = true;

	let activeArgumentsInstance;

	const findArgumentsAndStoreValues = (editor: EditorBase) => {
		const tempArguments: any[] = [];
		editor.state.doc.descendants((node, pos) => {
			const { marks } = node;
			marks.forEach((mark) => {
				if (mark.type.name === 'argument') {
					const markArguments = mark.attrs.argument;
					const jsonArguments = markArguments ? JSON.parse(markArguments) : null;
					if (jsonArguments !== null) {
						tempArguments.push({
							node,
							jsonArguments,
							from: pos,
							to: pos + (node.text?.length || 0),
							text: node.text
						});
					}
				}
			});
		});
		$analysis.arguments = tempArguments;
	};

	let editor: Readable<Editor>;
	let timer: any;

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
				Arguments.configure({})
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
				findArgumentsAndStoreValues(editor);
				setCurrentArgument(editor);
			},
			onSelectionUpdate({ editor, transaction }) {
				setCurrentArgument(editor);
				isTextSelected = !!editor.state.selection.content().size;
				if (transaction.selection.$anchor.pos !== transaction.selection.$head.pos) {
					toolTip(transaction.selection);
				} else {
					clearTimeout(timer);
					if (editor.isActive('argument')) {
						console.log('on argument');
						// editor.
					}
				}
			},
			onCreate({ editor }) {
				findArgumentsAndStoreValues(editor);
			}
		});
	});

	const setCurrentArgument = (editor: EditorBase) => {
		const newVal = editor.isActive('argument');
		if (newVal) {
			setTimeout(() => (showArgumentMenu = newVal), 50);
			showAddArgumentSection = !editor.state.selection.empty;
			const parsedArgument = JSON.parse(editor.getAttributes('argument').argument);
			parsedArgument.argument =
				typeof parsedArgument.arguments === 'string'
					? JSON.parse(parsedArgument.arguments)
					: parsedArgument.arguments;
			activeArgumentsInstance = parsedArgument;
		} else {
			activeArgumentsInstance = {};
		}
	};

	const toggleArgumentMode = () => {
		isArgumentModeOn = !isArgumentModeOn;
		if (isArgumentModeOn) $editor.setEditable(false);
		else $editor.setEditable(true);
	};
</script>

<div class="overflow-scroll">
	<!-- <button class="btn" on:click={() => displayArguments(args)}> Display </button> -->
	<!-- <button class="btn" on:click={() => $editor.commands.toggleHighlight()}> Highlight </button> -->
	<!-- <button class="btn" on:click={() => displayArguments($analysis.arguments)}> Arguments </button> -->
	<!-- <button -->
	<!-- 	class="btn" -->
	<!-- 	on:click={() => -->
	<!-- 		$editor.commands.toggleArgument({ color: getRandomLightHexColor(), id: 'test' })} -->
	<!-- > -->
	<!-- 	Set arg -->
	<!-- </button> -->
	{#if editor}
		<BubbleMenu {editor} />
		<!-- {$editor.getHTML()} -->
	{/if}
	<EditorContent editor={$editor} />
</div>
