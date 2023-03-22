<script lang="ts">
	import { onMount } from 'svelte';
	import StarterKit from '@tiptap/starter-kit';
	import { createEditor, Editor, EditorContent } from 'svelte-tiptap';
	import Placeholder from '@tiptap/extension-placeholder';
	import BubbleMenu from './tiptap/BubbleMenu.svelte';
	import type { Readable } from 'svelte/store';

	export let value = '';
	export let update = (_) => {};
	let editor: Readable<Editor>;
	let timer;

	export function focus() {
		$editor.commands.focus();
	}

	const toolTip = (selection) => {
		clearTimeout(timer);
		timer = setTimeout(() => {
			// console.log('start,', sel.$anchor.pos, 'end,', sel.$head.pos);
			const { from, to } = selection;
			const text = $editor.state.doc.textBetween(from, to, ' ');
			console.log(text);
		}, 1000);
	};

	onMount(() => {
		editor = createEditor({
			extensions: [
				StarterKit,
				Placeholder.configure({
					placeholder: 'Start typing...'
				})
			],
			editorProps: {
				attributes: {
					class: 'leading-[1.85rem] focus:outline-none'
				}
			},
			content: value,
			onUpdate({ editor }) {
				update({ content: editor.getText() });
			},
			onSelectionUpdate({ editor, transaction }) {
				if (transaction.selection.$anchor.pos !== transaction.selection.$head.pos) {
					toolTip(transaction.selection);
				} else {
					clearTimeout(timer);
				}
			}
		});
	});
</script>

{#if editor}
	<BubbleMenu {editor} />
{/if}
<EditorContent editor={$editor} />
