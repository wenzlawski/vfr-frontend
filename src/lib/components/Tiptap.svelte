<script lang="ts">
  import { onMount } from 'svelte';
  import StarterKit from '@tiptap/starter-kit';
  import type { Editor as EditorBase } from '@tiptap/core';
  import { createEditor, Editor, EditorContent } from 'svelte-tiptap';
  import Placeholder from '@tiptap/extension-placeholder';
  import Highlight from '@tiptap/extension-highlight';
  import BubbleMenu from './tiptap/BubbleMenu.svelte';
  import type { Readable, Writable } from 'svelte/store';
  import type { documentStore } from '$lib/stores/document';
  import type { analysisStore, ArgumentInstance } from '$lib/stores/analysis';
  import { Arguments } from '$lib/arguments';
  import { getRandomLightHexColor } from '$lib/utils';
  import { v4 as uuidv4 } from 'uuid';
  import { debounce } from 'lodash';
  import { argData } from '$lib/data';

  export let value: typeof documentStore;
  export let argumentStore: typeof analysisStore;
  export let activeArgumentUuid: Writable<string>;

  $: setActiveArgument($activeArgumentUuid);

  $: {
    clearArgumentsEditor();
    displayArguments($argumentStore?.arguments);
  }

  let isArgumentModeOn = false;
  let editor: Readable<Editor>;
  let timer: any;

  function setActiveArgument(uuid: string) {
    if (editor === undefined) return;
    reDrawArguments();
    $editor.state.doc.descendants((node) => {
      const { marks } = node;
      marks.forEach((mark) => {
        if (mark.type.name === 'argument') {
          const a_uuid = mark.attrs.id;
          const { start, end, color } = mark.attrs;
          if (a_uuid === uuid) {
            console.log('found it', mark);
            $editor
              .chain()
              .focus()
              .setTextSelection({ from: start, to: end })
              .unsetArgument()
              .setTextSelection({ from: start, to: end })
              .setArgument({ id: uuid, start, end, color, active: true })
              .setTextSelection(0)
              .run();
            // mark.attrs.active = true;
          } else {
            // mark.attrs.active = false;
          }
        }
      });
    });
  }

  export function focus() {
    $editor.commands.focus();
  }

  export function getEditor() {
    if ($editor) {
      return $editor;
    } else {
      return null;
    }
  }

  export function toggleEditable() {
    $editor.setEditable(!$editor.isEditable);
    return $editor.isEditable;
  }

  // let showArgumentMenu = false;
  // let isTextSelected = false;
  // let showAddArgumentSection = true;
  // let activeArgumentsInstance;
  // const findArgumentsAndStoreValues = (editor: EditorBase) => {
  //   const tempArguments: any[] = [];
  //   editor.state.doc.descendants((node, pos) => {
  //     const { marks } = node;
  //     marks.forEach((mark) => {
  //       if (mark.type.name === 'argument') {
  //         const markArguments = mark.attrs.argument;
  //         const jsonArguments = markArguments
  //           ? JSON.parse(markArguments)
  //           : null;
  //         if (jsonArguments !== null) {
  //           tempArguments.push({
  //             node,
  //             jsonArguments,
  //             from: pos,
  //             to: pos + (node.text?.length || 0),
  //             text: node.text
  //           });
  //         }
  //       }
  //     });
  //   });
  //   $argumentStore.arguments = tempArguments;
  // };

  function highlightArgument(start: number, end: number) {
    if (start === -1) return;

    $editor.commands.setArgument({
      color: getRandomLightHexColor(),
      id: 'test',
      start,
      end
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

  function reDrawArguments() {
    const allArguments: Record<string, any> = [];
    $editor.state.doc.descendants((node) => {
      const { marks } = node;
      marks.forEach((mark) => {
        if (mark.type.name === 'argument') {
          const { start, end, color, id } = mark.attrs;
          allArguments.push({
            start,
            end,
            color,
            id
          });
        }
      });
    });
    clearEventListenersFromDecorations();
    clearArgumentsEditor();
    allArguments.forEach(
      (arg: {
        id: string;
        start: number;
        end: number;
        color?: string | undefined;
        active?: boolean | undefined;
      }) => setArgument(arg)
    );
    setTimeout(addEventListenersToDecorations, 50);
  }

  export function clearArgumentsEditor() {
    if (editor === undefined) return;
    $editor
      .chain()
      .selectAll()
      .unsetAllMarks()
      .focus()
      .setTextSelection(0)
      .run();
  }

  export function deepClearArguments() {
    argumentStore.clear();
    clearArgumentsEditor();
    // $editor.commands.focus();
    // $editor.commands.setTextSelection(0);
    // $editor.state.doc.descendants((node) => {
    //   const { marks } = node;
    //   marks.forEach((mark) => {
    //     if (mark.type.name === 'argument') {
    //       $editor.setTextSelection(0);
    //     }
    //   });
    // });
  }

  export function displayArguments(args: ArgumentInstance[]) {
    // display the arguments as highlights on the editor
    if ($editor == null) return;
    console.log('displaying arguments');
    for (let arg of args) {
      setArgument({
        start: arg.start,
        end: arg.end,
        id: arg.uuid,
        color: getRandomLightHexColor()
      });
    }
    $editor.chain().focus().setTextSelection(0).run();
    setTimeout(addEventListenersToDecorations, 50);
  }

  const toolTip = (selection: { from: number; to: number }) => {
    clearTimeout(timer);
    timer = setTimeout(() => {
      // console.log('start,', sel.$anchor.pos, 'end,', sel.$head.pos);
      const { from, to } = selection;
      const text = $editor.state.doc.textBetween(from, to, ' ');
    }, 1000);
  };

  const mouseEventsListener = (e: Event) => {
    console.log('mouse event', e);
    if (!e.target) return;

    e.target.removeEventListener('click', debouncedMouseEventsListener);
    e.target.addEventListener('click', debouncedMouseEventsListener);

    const matchString = (e.target as HTMLSpanElement)
      .getAttribute('uuid')
      ?.trim();

    console.log('on this argument');
    console.log('matchString', matchString);

    if (!matchString) {
      console.error('No match string provided', { matchString });
      return;
    }

    $activeArgumentUuid = matchString;

    // const { match, from, to } = JSON.parse(matchString);

    // if (matchString) updateMatchAndRange(match, { from, to });
    // else updateMatchAndRange();
  };

  const debouncedMouseEventsListener = debounce(mouseEventsListener, 50);

  const clearEventListenersFromDecorations = () => {
    const decorations = document.querySelectorAll('span.argument');

    if (!decorations.length) return;

    decorations.forEach((el) => {
      // el.addEventListener('mouseover', debouncedMouseEventsListener);
      // el.addEventListener('mouseenter', debouncedMouseEventsListener);
      el.removeEventListener('click', mouseEventsListener);
    });
  };

  const addEventListenersToDecorations = () => {
    const decorations = document.querySelectorAll('span.argument');

    if (!decorations.length) return;

    decorations.forEach((el) => {
      // el.addEventListener('mouseover', debouncedMouseEventsListener);
      // el.addEventListener('mouseenter', debouncedMouseEventsListener);
      el.addEventListener('click', mouseEventsListener);
    });
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
            console.log('on selection argument');
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

  // const setCurrentArgument = (editor: EditorBase) => {
  //   const newVal = editor.isActive('argument');
  //   if (newVal) {
  //     setTimeout(() => (showArgumentMenu = newVal), 50);
  //     showAddArgumentSection = !editor.state.selection.empty;
  //     console.log(editor.getAttributes('argument'));
  //     const parsedArgument = JSON.parse(editor.getAttributes('argument'));
  //     parsedArgument.argument =
  //       typeof parsedArgument.arguments === 'string'
  //         ? JSON.parse(parsedArgument.arguments)
  //         : parsedArgument.arguments;
  //     activeArgumentsInstance = parsedArgument;
  //   } else {
  //     activeArgumentsInstance = {};
  //   }
  // };

  export function toggleArgument() {
    const { from, to } = $editor.state.selection;
    setArgument({
      id: uuidv4(),
      start: from,
      end: to,
      color: getRandomLightHexColor()
    });
  }

  export const setArgument = (attributes: {
    id: string;
    start: number;
    end: number;
    color?: string;
    active?: boolean;
  }) => {
    const { from, to } = $editor.state.selection;
    $editor
      .chain()
      .setArgument(attributes)
      .setTextSelection({ from, to })
      .run();
  };

  const toggleArgumentMode = () => {
    isArgumentModeOn = !isArgumentModeOn;
    if (isArgumentModeOn) $editor.setEditable(false);
    else $editor.setEditable(true);
  };
</script>

<div class="overflow-scroll">
  {#if editor}
    <BubbleMenu {editor} on:message={handleBubble} />
    <!-- {$editor.getHTML()} -->
  {/if}
  <EditorContent editor={$editor} />
</div>
<!-- &:hover { -->
<!--   background-color: rgba(#add8e6, 0.5); -->
<!--   border-bottom: 4px -->
<!--   cursor: pointer; -->

<!-- } -->
<style global lang="scss">
  span.argument {
    padding: 0.2rem 0.1rem;
    margin: 0 0.25rem;
    cursor: pointer;
    border-radius: 0.25rem;

    &:hover {
      margin-bottom: 0.2rem;
      border-bottom-width: 4px !important;
    }
  }
</style>
