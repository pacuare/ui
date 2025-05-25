import { call, type Client } from './client';

export const exists = (client: Client) => call<boolean>(client, '/db/exists')
export const create = (client: Client) => call<string>(client, '/db/create', {method: 'POST'})
export const refresh = (client: Client) => call<string>(client, '/db/create?refresh=refresh', {method: 'POST'})
export const recreate = (client: Client) => call<string>(client, '/db/create?refresh=recreate', {method: 'POST'})