<script lang="ts">
	import { onMount } from 'svelte';
	import StarterKit from '@tiptap/starter-kit';
	import { createEditor, EditorContent } from 'svelte-tiptap';
	import Placeholder from '@tiptap/extension-placeholder';

	export let value = '';
	export let update = (_) => {};

	let editor;
	let timer;

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
			}
		});
	});
</script>

<EditorContent editor={$editor} />
