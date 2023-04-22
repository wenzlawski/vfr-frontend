import { writable } from 'svelte/store';

export interface ArgumentComponent {
  uuid: string;
  text: string;
  start: number;
  end: number;
}

export interface ArgumentInstance {
  uuid: string;
  confidence: number;
  sufficiency: number;
  text: string;
  // claim: ArgumentComponent;
  // premise: ArgumentComponent;
  start: number;
  end: number;
}

const initialState = {
  arguments: [] as ArgumentInstance[],
  text: '',
  isRunning: false,
  hasAnalysis: false
};

const createAnaStore = () => {
  const { subscribe, update } = writable(initialState);
  // const saveDebounced = debounce(async () => {
  //   await save();
  // }, 1000); // Adjust the debounce time as needed
  //
  // async function save() {
  //   update((doc) => {
  //     doc.lastModified = new Date();
  //     return doc;
  //   });
  //
  //   const { _id, ...docData } = get(analysisStore);
  //   fetch(`/api/documents/${_id}`, {
  //     method: 'POST',
  //     body: JSON.stringify(docData)
  //   });
  // }

  return {
    subscribe,

    async init() {
      update((doc) => {
        doc = initialState;
        doc.arguments = [];
        doc.isRunning = true;
        return doc;
      });
    },

    async clear() {
      update((doc) => {
        doc.arguments = [];
        doc.hasAnalysis = false;
        doc.text = '';
        return doc;
      });
    },

    async setArguments(args: any, text: string) {
      update((doc) => {
        doc.arguments = args;
        doc.text = text;
        doc.hasAnalysis = true;
        doc.isRunning = false;
        return doc;
      });
    },

    sortArgs(by: string) {
      console.log('soring by ', by);
      update((doc) => {
        switch (by) {
          case 'conf_asc':
            doc.arguments = doc.arguments.sort(
              (a, b) => b.confidence - a.confidence
            );
            break;
          case 'conf_desc':
            doc.arguments = doc.arguments.sort(
              (a, b) => a.confidence - b.confidence
            );
            break;
          case 'suff_asc':
            doc.arguments = doc.arguments.sort(
              (a, b) => b.sufficiency - a.sufficiency
            );
            break;
          case 'suff_desc':
            doc.arguments = doc.arguments.sort(
              (a, b) => a.sufficiency - b.sufficiency
            );
            break;
          default:
            doc.arguments = doc.arguments.sort((a, b) => a.start - b.start);
        }
        return doc;
      });
    },

    // save,

    updateHL(newDoc: any) {
      update((doc) => {
        Object.assign(doc, newDoc);
        // doc[field] = value;
        return doc;
      });
      // saveDebounced();
    }
  };
};

export const analysisStore = createAnaStore();
