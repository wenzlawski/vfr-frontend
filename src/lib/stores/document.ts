import { get, writable } from 'svelte/store';
import { debounce } from '$lib/utils';

const initialState = {
  _id: '',
  title: '',
  content: '',
  createdAt: new Date(),
  createdBy: null,
  lastModified: new Date(),
  tabSize: 0,
  deleted: false
};

const createDocStore = () => {
  const { subscribe, set, update } = writable(initialState);
  const saveDebounced = debounce(async () => {
    await save();
  }, 1000); // Adjust the debounce time as needed

  async function save() {
    update((doc) => {
      doc.lastModified = new Date();
      return doc;
    });

    const { _id, ...docData } = get(documentStore);
    fetch(`/api/documents/${_id}`, {
      method: 'POST',
      body: JSON.stringify(docData)
    });
  }

  return {
    subscribe,

    async init(docData: typeof initialState) {
      // const doc = await getDocumentById(documentId, ownerId);
      set(docData);
    },

    save,

    updateField(newDoc: any) {
      update((doc) => {
        Object.assign(doc, newDoc);
        // doc[field] = value;
        return doc;
      });
      saveDebounced();
    }
  };
};

export const documentStore = createDocStore();
