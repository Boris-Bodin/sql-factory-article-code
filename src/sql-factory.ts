import {SqlClient} from "./sql-client";
import {ClientConfig, QueryResultRow} from "pg";

export class SqlFactory {
    private static remotes: { [key: string]: ClientConfig };

    static async query<Dto extends QueryResultRow>(remoteKey: string, queryFactory: (queryOpts: any) => string, queryOpts: any): T[] {
            await using client = new SqlClient(this.findRemote(remoteKey));
        return await client.query(queryFactory(queryOpts));
    }

    private static findRemote(remoteKey: string): ClientConfig {
        return this.remotes[remoteKey];
    }

    static registerRemote(remoteKey: string, config: ClientConfig) {
        this.remotes[remoteKey] = config;
    }
}
