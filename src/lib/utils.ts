export const serializeNonPOJOs = (obj) => {
	return structuredClone(obj);
};

export function debounce(func: any, wait: number) {
	let timeout: any;
	return (...args) => {
		clearTimeout(timeout);
		timeout = setTimeout(() => func.apply(this, args), wait);
	};
}

export const getImageURL = (collectionId, recordId, fileName, size = '0x0') => {
	return `http://localhost:8090/api/files/${collectionId}/${recordId}/${fileName}?thumb=${size}`;
};

export const validateData = async (formData, schema) => {
	const body = Object.fromEntries(formData);

	try {
		const data = schema.parse(body);
		return {
			formData: data,
			errors: null
		};
	} catch (err: any) {
		console.log('Error: ', err);
		const errors = err.flatten();
		return {
			formData: body,
			errors
		};
	}
};

export function downloadFile(fileContent, fileName, fileType) {
	// create a blob from the string content
	const blob = new Blob([fileContent], { type: fileType });

	// create a URL to the blob
	const url = window.URL.createObjectURL(blob);

	// create a download link
	const link = document.createElement('a');
	link.href = url;
	link.download = fileName;
	document.body.appendChild(link);

	// simulate a click on the download link
	link.click();

	// clean up the URL and link
	window.URL.revokeObjectURL(url);
	document.body.removeChild(link);
}
