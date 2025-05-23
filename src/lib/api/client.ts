import type { Args } from '$lib/types';

export type Client = { baseUrl: string };

export function call<T>({ baseUrl }: Client, ...[path, opts]: Args<typeof fetch>): Promise<T> {
	return fetch(baseUrl + path, opts).then((res) => {
		if(!res.ok) throw res;
		return res.json()
	});
}

export const client: Client = {
	baseUrl: import.meta.env.VITE_PUBLIC_API_URL ?? 'https://api.pacuare.dev/v1'
};
