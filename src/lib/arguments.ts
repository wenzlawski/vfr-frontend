import { mergeAttributes, getMarkRange, Mark } from '@tiptap/core';
import { Plugin, TextSelection } from 'prosemirror-state';

export interface ArgumentSpanOptions {
	HTMLAttributes: Record<string, any>;
	isArgumentModeOn: () => boolean;
}

declare module '@tiptap/core' {
	interface Commands<ReturnType> {
		argumentspan: {
			setArgument: (attributes?: { color: string; id: string }) => ReturnType;
			toggleArgument: (attributes?: { color: string; id: string }) => ReturnType;
			unsetArgument: () => ReturnType;
		};
	}
}

export const ArgumentSpan = Mark.create<ArgumentSpanOptions>({
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
						return commands.setMark(this.name, attributes);
					},
			toggleArgument:
				(attributes) =>
					({ commands }) => {
						return commands.toggleMark(this.name, attributes);
					},
			unsetComment:
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

					const [$start, $end] = [doc.resolve(range.from), doc.resolve(range.to)];

					view.dispatch(tr.setSelection(new TextSelection($start, $end)));

					return true;
				}
			}
		});
	}
});
