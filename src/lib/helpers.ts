export const serializeNonPOJOs = (obj) => {
	return JSON.parse(JSON.stringify(obj));
};

// This function validates a url against a list of routes
// It returns true if the url starts with any of the routes
// It returns false otherwise
export function validateUrl(url: string, urls: string[]) {
	return urls.some((route) => url.startsWith(route));
}
