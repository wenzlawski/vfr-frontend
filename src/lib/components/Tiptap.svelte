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
  import type { analysisStore, ArgumentInstance } from '$lib/stores/analysis';
  import { Arguments } from '$lib/arguments';
  import { getRandomLightHexColor } from '$lib/utils';
  import { v4 as uuidv4 } from 'uuid';
  import { argData } from '$lib/data';

  export let value: typeof documentStore;
  export let argumentStore: typeof analysisStore;

  export function focus() {
    $editor.commands.focus();
  }

  export function getEditor() {
    if ($editor) {
      return editor;
    } else {
      return null;
    }
  }

  export function toggleEditable() {
    $editor.setEditable(!$editor.isEditable);
    return $editor.isEditable;
  }

  $: {
    displayArguments($argumentStore?.arguments);
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
          const jsonArguments = markArguments
            ? JSON.parse(markArguments)
            : null;
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
    $argumentStore.arguments = tempArguments;
  };

  let editor: Readable<Editor>;
  let timer: any;

  function highlightArgument(start: number, end: number) {
    if (start === -1) return;

    $editor.commands.setArgument({
      color: getRandomLightHexColor(),
      id: 'test'
    });
    // $editor.chain().focus().toggleHighlight({ color: getRandomLightHexColor() }).run();
  }

  function handleBubble(event) {
    console.log('event', event.detail);
    switch (event.detail.action) {
      case 'add': {
        console.log('add');
        toggleArgument();
        break;
      }
      default: {
        console.log('default');
        break;
      }
    }
  }

  export function displayArguments(args: ArgumentInstance[]) {
    // display the arguments as highlights on the editor
    if ($editor == null) return;
    console.log('displaying arguments');
    for (let arg of args) {
      setArgument(arg.start, arg.end, arg.uuid);
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
      content: $value.content.replace(/([,.'])/g, ' $1'),
      onUpdate({ editor }) {
        value.updateField({ content: editor.getText() });
        // findArgumentsAndStoreValues(editor);
        // setCurrentArgument(editor);
      },
      onSelectionUpdate({ editor, transaction }) {
        // setCurrentArgument(editor);
        // isTextSelected = !!editor.state.selection.content().size;
        if (
          transaction.selection.$anchor.pos !== transaction.selection.$head.pos
        ) {
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
        value.updateField({ content: editor.getText() });
        // findArgumentsAndStoreValues(editor);
        // const text = editor.content.replace(/ ([,.'])/g, '$1');
        // editor.setContent(text);
      }
    });
  });

  const setCurrentArgument = (editor: EditorBase) => {
    const newVal = editor.isActive('argument');
    if (newVal) {
      setTimeout(() => (showArgumentMenu = newVal), 50);
      showAddArgumentSection = !editor.state.selection.empty;
      console.log(editor.getAttributes('argument'));
      const parsedArgument = JSON.parse(editor.getAttributes('argument'));
      parsedArgument.argument =
        typeof parsedArgument.arguments === 'string'
          ? JSON.parse(parsedArgument.arguments)
          : parsedArgument.arguments;
      activeArgumentsInstance = parsedArgument;
    } else {
      activeArgumentsInstance = {};
    }
  };

  export function toggleArgument() {
    $editor.commands.setArgument({
      color: getRandomLightHexColor(),
      id: uuidv4()
    });
  }

  export const setArgument = (start: number, end: number, uuid: string) => {
    // const activeArgumentInstance: ArgumentInstance = JSON.parse(
    // 	JSON.stringify(activeArgumentsInstance.value)
    // );
    // const argumentsArray = typeof activeArgumentInstance.arguments === 'string' ? JSON.parse(activeArgumentInstance.arguments) : activeArgumentInstance.arguments
    const argumentsArray = [];
    const { from, to } = $editor.state.selection;
    if (argumentsArray) {
      // argumentsArray.push({
      // 	userName: 'marc',
      // 	time: Date.now(),
      // 	content: localVal
      // });
      // const argumentWithUuid = JSON.stringify({
      // 	uuid: activeArgumentsInstance.uuid || uuidv4(),
      // 	arguments: argumentsArray
      // });
      // eslint-disable-next-line no-unused-expressions
      $editor
        .chain()
        .setTextSelection({ from: start, to: end })
        .setArgument({ color: getRandomLightHexColor(), id: uuid })
        .setTextSelection({ from, to })
        .run();
      // $editor.chain().setArgument(argumentWithUuid).run()
    } else {
      // const argumentWithUuid = JSON.stringify({
      // 	uuid: uuidv4(),
      // 	arguments: [
      // 		{
      // 			userName: 'marc',
      // 			time: Date.now(),
      // 			content: localVal
      // 		}
      // 	]
      // });
      // eslint-disable-next-line no-unused-expressions
      // $editor.chain().setArgument(argumentWithUuid).run()
      $editor
        .chain()
        .setTextSelection({ from: start, to: end })
        .setArgument({ color: getRandomLightHexColor(), id: uuid })
        .setTextSelection({ from, to })
        .run();
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
    <BubbleMenu {editor} on:message={handleBubble} />
    <!-- {$editor.getHTML()} -->
  {/if}
  <EditorContent editor={$editor} />
</div>
