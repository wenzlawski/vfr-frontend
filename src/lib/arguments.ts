import { mergeAttributes, getMarkRange, Mark } from '@tiptap/core';
import { Plugin, TextSelection } from 'prosemirror-state';
import { getRandomLightHexColor } from './utils';

export interface ArgumentSpanOptions {
  HTMLAttributes: Record<string, any>;
  isArgumentModeOn: () => boolean;
}

declare module '@tiptap/core' {
  interface Commands<ReturnType> {
    argumentspan: {
      setArgument: (attributes?: {
        id: string;
        start: number;
        end: number;
        color?: string;
        active?: boolean;
      }) => ReturnType;
      toggleArgument: (attributes?: {
        color: string;
        id: string;
      }) => ReturnType;
      unsetArgument: () => ReturnType;
    };
  }
}

export const Arguments = Mark.create<ArgumentSpanOptions>({
  name: 'argument',

  addOptions() {
    return {
      HTMLAttributes: {},
      isArgumentModeOn: () => false
    };
  },

  addAttributes() {
    return {
      id: {
        default: null,
        parseHTML: (element) => element.getAttribute('uuid'),
        renderHTML: (attributes) => {
          if (!attributes.id) {
            return {};
          }

          return {
            uuid: attributes.id
          };
        }
      },
      start: {
        default: null,
        parseHTML: (element) => element.getAttribute('start'),
        renderHTML: (attributes) => {
          if (!attributes.start) {
            return {};
          }

          return {
            start: attributes.start
          };
        }
      },
      end: {
        default: null,
        parseHTML: (element) => element.getAttribute('end'),
        renderHTML: (attributes) => {
          if (!attributes.end) {
            return {};
          }

          return {
            end: attributes.end
          };
        }
      },
      active: {
        default: false,
        parseHTML: (element) => element.getAttribute('active'),
        renderHTML: (attributes) => {
          if (!attributes.active) {
            return {};
          }

          return {
            active: attributes.active
            // class: attributes.active ? 'active' : ''
          };
        }
      },
      color: {
        default: 'yellow',
        parseHTML: (element) =>
          element.getAttribute('data-color') || element.style.backgroundColor,
        renderHTML: (attributes) => {
          return {
            style: attributes.active
              ? `background-color: ${attributes.color}`
              : `border-bottom: 3px solid ${attributes.color}`
          };
        }
      }
    };
  },

  group: 'block',
  content: 'inline*',
  selectable: false,
  atom: false,

  parseHTML() {
    return [
      {
        tag: `span[class="${this.name}"]`
      }
    ];
  },

  renderHTML({ HTMLAttributes }) {
    return [
      'span',
      mergeAttributes(
        { class: this.name },
        this.options.HTMLAttributes,
        HTMLAttributes
      ),
      0
    ];
  },

  addCommands() {
    return {
      setArgument:
        (attributes) =>
          ({ commands }) => {
            if (attributes !== undefined) {
              commands.setTextSelection({
                from: attributes.start,
                to: attributes.end
              });
            }
            return commands.setMark(this.name, attributes);
          },
      toggleArgument:
        (attributes) =>
          ({ commands }) => {
            return commands.toggleMark(this.name, attributes);
          },
      unsetArgument:
        () =>
          ({ commands }) =>
            commands.unsetMark('argument')
    };
  },

  addProseMirrorPlugin() {
    // eslint-disable-next-line @typescript-eslint/no-this-alias
    const extensionThis = this;

    return new Plugin({
      props: {
        handleClick(view, pos) {
          if (!extensionThis.options.isArgumentModeOn()) return false;

          const { schema, doc, tr } = view.state;

          const range = getMarkRange(doc.resolve(pos), schema.marks.comment);

          if (!range) return false;

          const [$start, $end] = [
            doc.resolve(range.from),
            doc.resolve(range.to)
          ];

          view.dispatch(tr.setSelection(new TextSelection($start, $end)));

          return true;
        }
      }
    });
  }
});
