import { call, type Client } from './client';

export const exists = (client: Client) => call<boolean>(client, '/db/exists')
export const create = (client: Client) => call<string>(client, '/db/create')