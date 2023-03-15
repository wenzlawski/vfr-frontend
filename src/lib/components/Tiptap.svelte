<script lang="ts">
	import { onMount } from 'svelte';
	import StarterKit from '@tiptap/starter-kit';
	import { createEditor, EditorContent } from 'svelte-tiptap';
	import Placeholder from '@tiptap/extension-placeholder';
	// import { LanguageTool, Match } from '$lib/languagetool';

	// const match = ref<Match>(null);

	// const updateMatch = computed(() => match.value?.replacements || []);
	// const replacements = computed(() => match.value?.replacements || []);
	// const matchMessage = computed(() => match.value?.message || 'No Message');
	// const updateHtml = () => navigator.clipboard.writeText(editor.value.getHTML());
	// const acceptSuggestion = (sug) => {
	// 	editor.value.commands.insertContent(sug.value);
	// };
	// const proofread = () => editor.value.commands.proofread();

	export let value = '';
	export let update = (_) => {};
	let editor;

	export function focus() {
		$editor.commands.focus();
	}

	onMount(() => {
		editor = createEditor({
			extensions: [
				StarterKit,
				Placeholder.configure({
					placeholder: 'Start typing...'
				})
				// LanguageTool.configure({
				// 	language: 'auto',
				// 	apiUrl: 'https://languagetool.org/api/v2',
				// 	automaticMode: true
				// })
			],
			editorProps: {
				attributes: {
					class: 'leading-[1.85rem] focus:outline-none'
				}
			},
			content: value,
			onUpdate({ editor }) {
				update({ content: editor.getText() });
				// setTimeout(() => updateMatch(editor));
			},
			onSelectionUpdate({ editor }) {
				// setTimeout(() => updateMatch(editor));
			}
		});
	});
</script>

<EditorContent editor={$editor} />
