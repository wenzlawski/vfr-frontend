<script lang="ts">
	import { onMount } from 'svelte';
	import StarterKit from '@tiptap/starter-kit';
	import { createEditor, EditorContent } from 'svelte-tiptap';

	export let value = '';
	export let update = (_) => {};

	let editor;
	let timer;

	onMount(() => {
		editor = createEditor({
			extensions: [StarterKit],
			content: value,
			onUpdate({ editor }) {
				update({ content: editor.getText() });
			}
		});
	});
</script>

<EditorContent editor={$editor} />
