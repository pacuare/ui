import { type Client, call } from './client';

export type AccessInfo = {
	email: string,
	access_level: 'restricted' | 'full'
};

export const getCode = (client: Client, email: string): Promise<'sent'> =>
	call(client, `/auth/verify?email=${encodeURIComponent(email)}`);

export const verify = (client: Client, email: string, code: string): Promise<'ok'> =>
	call(client, `/auth/verify?email=${encodeURIComponent(email)}`, {
		method: 'POST',
		body: (() => {
			const f = new FormData();
			f.append('code', code);
			return f;
		})()
	});

export const getAccess = (client: Client): Promise<AccessInfo> => call(client, '/auth/access');

export const logOut = (client: Client) => call(client, '/auth/logout', {method: 'post'});

export const getKey = (client: Client, description: string) =>
	call<string>(client, `/auth/key?description=${encodeURIComponent(description)}`);
