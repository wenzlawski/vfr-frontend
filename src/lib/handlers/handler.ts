// Handler for the ML APIs.
// Handler needs to have a function to send the request,
// a function to handle the response, and a function to dump the data

abstract class RemoteEndpoint {
  protected data: any;

  constructor() {
    this.data = null;
  }

  protected abstract makeRequest(data: string, opts: any): Promise<any>;

  protected abstract handleResponse(response: any): void;

  public async fetchData(data: string, opts: any): Promise<any> {
    const response = await this.makeRequest(data, opts);
    return this.handleResponse(response);
  }

  public outputData(): void {
    console.log(this.data);
  }

  public async saveDataToDatabase(): Promise<void> {
    // Save the data to a database
  }
}

export default RemoteEndpoint;
