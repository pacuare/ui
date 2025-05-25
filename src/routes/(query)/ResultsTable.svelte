<script lang="ts">
	import { client } from '$lib/api/client';
	import { query, type QueryResponse } from '$lib/api/query';
	import { button } from '$lib/components/button';
	import { spinner } from '$lib/components/spinner';
	import { LoaderCircle, Download } from '@lucide/svelte';
	import { fade } from 'svelte/transition';
	import { downloadData } from '$lib/export/download';

	let loading = $state(false);
	let results = $state<QueryResponse>();

	export async function runQuery(q: string) {
		results = undefined;
		loading = true;
		results = await query(client, q, []);
		loading = false;
	}

	function downloadResults() {
		if(results) downloadData(results)
		else console.error('Attempted to export nonexistent results')
	}
</script>

{#if loading}
	<div class="flex flex-1 h-full items-center justify-center" transition:fade>
		<div {...spinner()}>
			<LoaderCircle />
		</div>
	</div>
{:else if results}
	<table transition:fade>
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
	<button {...button('primary')('block absolute bottom-5 right-5 border-none')} onclick={downloadResults} title={`Download ${results.values.length} rows`} transition:fade>
		<Download class="size-4"/>
	</button>
{:else}
	<div class="flex h-full items-center justify-center px-4 py-3" transition:fade>
		<p>Type a semicolon to run your query.</p>
	</div>
{/if}
