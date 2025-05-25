<script lang="ts">
	import { client } from '$lib/api/client';
	import { query, type QueryResponse } from '$lib/api/query';
	import { spinner } from '$lib/components/spinner';
	import { LoaderCircle } from '@lucide/svelte';

	let loading = $state(false);
	let results = $state<QueryResponse>();

	export async function runQuery(q: string) {
		loading = true;
		results = await query(client, q, []);
		loading = false;
	}
</script>

{#if loading}
	<div class="flex flex-1 h-full items-center justify-center">
		<div {...spinner()}>
			<LoaderCircle />
		</div>
	</div>
{:else if results}
	<table>
		<thead>
			<tr class="border-b border-gray-300">
				{#each results.columns as col}
					<th class="bg-gray-100 p-2">{col}</th>
				{/each}
			</tr>
		</thead>
		<tbody>
			{#each results.values as row}
				<tr class="border-gray-300 [:not(:last-child)]:border-b">
					{#each row as cell}
						<td class="p-2">{cell}</td>
					{/each}
				</tr>
			{/each}
		</tbody>
	</table>
{:else}
	<div class="flex h-full items-center justify-center px-4 py-3">
		<p>Type a semicolon to run your query.</p>
	</div>
{/if}
