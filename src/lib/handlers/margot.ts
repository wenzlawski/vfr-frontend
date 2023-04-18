// What we need
// 1. A request maker
// 2. A response handler
// 3. A database dump function

import RemoteEndpoint from './handler';

class MargotEndpoint extends RemoteEndpoint {
	protected async makeRequest(data: string, opts: any): Promise<any> {
		console.log('Sending request to Margot API');
		const options = {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				Accept: 'application/json'
			},
			body: JSON.stringify({ text: data })
		};
		const response = await fetch(
			'https://penelope.vub.be/margot-api/track-arguments',
			options
		).catch((err) => console.error(err));
		return response;
	}

	protected handleResponse(response: any): any {
		return response.json();
	}
}

export default MargotEndpoint;
