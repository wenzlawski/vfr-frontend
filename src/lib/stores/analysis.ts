import { get, writable } from 'svelte/store';
// import { debounce } from '$lib/utils';

const initialState = {
  arguments: [],
  isRunning: false,
  hasAnalysis: false
};

const createAnaStore = () => {
  const { subscribe, set, update } = writable(initialState);
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
        doc.isRunning = true;
        return doc;
      });
    },

    async setArguments(args: any) {
      update((doc) => {
        doc.arguments = args;
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
