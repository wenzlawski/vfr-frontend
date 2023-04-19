import { Node, mergeAttributes, Mark } from '@tiptap/core';

export interface ArgumentSpanOptions {
  HTMLAttributes: Record<string, any>;
}

declare module '@tiptap/core' {
  interface Commands<ReturnType> {
    argumentspan: {
      /**
       * Set a argument mark
       */
      setArgument: (attributes?: { color: string; id: string }) => ReturnType;
      /**
       * Toggle a argument mark
       */
      toggleArgument: (attributes?: { color: string; id: string }) => ReturnType;
    };
  }
}

export const ArgumentSpan = Node.create<ArgumentSpanOptions>({
  name: 'argumentspan',

  addOptions() {
    return {
      HTMLAttributes: {}
    };
  },

  addAttributes() {
    return {
      id: {
        default: null,
        parseHTML: (element) => element.getAttribute('data-id'),
        renderHTML: (attributes) => {
          if (!attributes.id) {
            return {};
          }

          return {
            'data-id': attributes.id
          };
        }
      },
      color: {
        default: 'yellow',
        parseHTML: (element) => element.getAttribute('data-color') || element.style.backgroundColor,
        renderHTML: (attributes) => {
          return {
            style: `background-color: ${attributes.color}; color: inherit`
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
        tag: `span[data-type="${this.name}"]`
      }
    ];
  },

  renderHTML({ HTMLAttributes }) {
    return ['span', mergeAttributes(this.options.HTMLAttributes, HTMLAttributes), 0];
  },

  addCommands() {
    return {
      setArgument:
        (attributes) =>
          ({ commands }) => {
            console.log('setArgument', attributes);
            // return commands.setMark(this.name, attributes);
            return commands.setNode(this.name, attributes);
          },
      toggleArgument:
        (attributes) =>
          ({ commands }) => {
            return commands.toggleNode(this.name, 'argumentspan', attributes);
          }
    };
  }
});
// renderHTML({ node, HTMLAttributes }) {
//   return [
//     'span',
//     mergeAttributes(this.options.HTMLAttributes, HTMLAttributes),
// {
//   style: `background-color: ${node.attrs.color}`,
//   'data-type': this.name
// },
// mergeAttributes(this.options.HTMLAttributes, HTMLAttributes),
0;
// ];
// ...(node.textContent ? node.textContent.split('').map((text) => ['span', text]) : [])
// ];
// }
