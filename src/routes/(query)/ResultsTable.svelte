<script lang="ts">
	import { client } from "$lib/api/client";
	import { query, type QueryResponse } from "$lib/api/query";
    import * as card from "$lib/components/card";
    import Lazy from 'svelte-lazy';

    let results = $state<QueryResponse>()

    export async function runQuery(q: string) {
        results = await query(client, q, [])
    }
</script>

<table>
    {#if results}
        <thead>
            <tr class="border-b border-gray-300">
                {#each results.columns as col}
                    <th class="p-2 bg-gray-100">{col}</th>
                {/each}
            </tr>
        </thead>
        <tbody>
            {#each results.values as row}
                <tr class="[:not(:last-child)]:border-b border-gray-300">
                    {#each row as cell}
                        <td class="p-2">{cell}</td>
                    {/each}
                </tr>
            {/each}
        </tbody>
    {:else}
        <tbody>
            <tr class="h-full flex px-4 py-3 items-center justify-center"><td>Type a semicolon to run your query.</td></tr>
        </tbody>
    {/if}
</table>