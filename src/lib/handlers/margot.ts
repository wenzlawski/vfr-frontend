// What we need
// 1. A request maker
// 2. A response handler
// 3. A database dump function

import RemoteEndpoint from './handler';
import type { ArgumentInstance, ArgumentComponent } from '$lib/stores/analysis';
import { parseArgument } from '$lib/utils';

class MargotEndpoint extends RemoteEndpoint {
  protected async makeRequest(data: string, opts: any): Promise<any> {
    console.log('Sending request to Margot API');
    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json'
      },
      body: JSON.stringify({ text: data.replace(/\n/g, ' ') })
    };
    const response = await fetch(
      'https://penelope.vub.be/margot-api/track-arguments',
      options
    ).catch((err) => console.error(err));
    return response;
  }

  protected async handleResponse(response: any): Promise<any> {
    // parge the response into a Analytics object and return it
    const data = await response.json();
    console.log(data);
    return data.document;
  }
}

export default MargotEndpoint;
