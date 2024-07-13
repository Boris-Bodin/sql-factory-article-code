import {Client, ClientConfig, QueryResultRow} from "pg";

export class SqlClient implements AsyncDisposable {
    private readonly client: Client;
    private isConnected = false;

    constructor(opts: ClientConfig) {
        this.client = new Client(opts);
    }

    async [Symbol.asyncDispose]() {
        await this.client.end();
    }

    async query<T extends QueryResultRow>(query: string): Promise<T[]> {
        await this.connect();
        try {
            const result = await this.client.query(query);
            return result.rows;
        } catch (e) {
            console.error(e);
            throw e;
        }
    }

    private async connect() {
        if (!this.isConnected) {
            await this.client.connect();
        }
        this.isConnected = true;
    }
}
