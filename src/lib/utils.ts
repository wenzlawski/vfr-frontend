export const serializeNonPOJOs = (obj: any) => {
	return structuredClone(obj);
};

export function debounce(func: any, wait: number) {
	let timeout: any;
	return function(this: any, ...args: Parameters<any>) {
		clearTimeout(timeout);
		timeout = setTimeout(() => func.apply(this, args), wait);
	};
}

export const validateData = async (
	formData: Iterable<readonly [PropertyKey, any]>,
	schema: { parse: (arg0: { [k: string]: any }) => any }
) => {
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

export function downloadFile(fileContent: BlobPart, fileName: string, fileType: string): void {
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

function getSubstringLocations(
	paragraph: string,
	objects: { text: string; claim_evidence?: string; claim?: string }[]
): { text: { start: number; span: number }; evidence: { start: number; span: number } }[] {
	const results: {
		text: { start: number; span: number };
		evidence: { start: number; span: number };
	}[] = [];
	for (const obj of objects) {
		const textStart = paragraph.indexOf(obj.text.replace(/ ([,.'])/g, '$1'));
		const textSpan = obj.text.length;
		let evidenceStart: number = 0;
		let evidenceSpan: number = 0;
		if (obj.claim_evidence !== undefined) {
			evidenceStart = paragraph.indexOf(obj.claim_evidence.replace(/ ([,.'])/g, '$1'));
			evidenceSpan = obj.claim_evidence.length;
		} else if (obj.claim !== undefined) {
			evidenceStart = paragraph.indexOf(obj.claim.replace(/ ([,.'])/g, '$1'));
			evidenceSpan = obj.claim.length;
		}
		results.push({
			text: { start: textStart, span: textSpan },
			evidence: { start: evidenceStart, span: evidenceSpan }
		});
	}
	return results;
}

export function getRandomLightHexColor(): string {
	let color = '#';
	for (let i = 0; i < 3; i++) {
		const channel = Math.floor(Math.random() * 60 + 186)
			.toString(16)
			.padStart(2, '0');
		color += channel;
	}
	return color;
}

export function getTextFromRanges(paragraph: string, argument: any) {
	console.log('argument: ', argument);
	return {
		claim: paragraph.slice(argument.text.start, argument.text.start + argument.text.span),
		evidence: paragraph.slice(
			argument.evidence.start,
			argument.evidence.start + argument.evidence.span
		)
	};
}

export function parseMargot(
	text: string,
	content: { text: string; claim_evidence?: string | undefined; claim?: string | undefined }[]
) {
	return getSubstringLocations(text, content);
}
