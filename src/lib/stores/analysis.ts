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
  arguments: [],
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

    async setArguments(args: any, text: string) {
      update((doc) => {
        doc.arguments = args;
        doc.text = text;
        doc.hasAnalysis = true;
        doc.isRunning = false;
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
