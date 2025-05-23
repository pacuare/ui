import { call, type Client } from "./client";

export type QueryResponse = {
    columns: string[],
    values: any[][]
}

export const query = (client: Client, query: string, params: unknown[]) => call<QueryResponse>(client, '/query', {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json'
    },
    body: JSON.stringify({query, params})
})