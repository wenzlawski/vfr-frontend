<script lang="ts">
	import { onMount } from 'svelte';
	import StarterKit from '@tiptap/starter-kit';
	import { createEditor, EditorContent } from 'svelte-tiptap';
	import Placeholder from '@tiptap/extension-placeholder';
	import { Extension } from '@tiptap/core';

	let editor;
	export let content = '';
	export let update = (_) => {};
	export let refocusOnEditor = () => {};

	const DisableEnter = Extension.create({
		addKeyboardShortcuts() {
			return {
				Enter: () => {
					refocusOnEditor();
					return true;
				}
			};
		}
	});
	onMount(() => {
		editor = createEditor({
			extensions: [
				StarterKit,
				Placeholder.configure({
					placeholder: 'Untitled document...'
				}),
				DisableEnter
			],
			editorProps: {
				attributes: {
					// class: 'leading-[1.85rem] focus:outline-none'
					class:
						'overflow-hidden flex-wrap resize-none h-auto w-full border-none text-xl font-semibold focus:outline-none'
				}
			},
			content: content,
			onUpdate({ editor }) {
				update({ title: editor.getText() });
			}
		});
	});
</script>

<EditorContent editor={$editor} />
