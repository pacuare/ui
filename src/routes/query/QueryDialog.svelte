<script lang="ts">
	import { input, card } from '@pacuare/design';
	import ResultsTable from './ResultsTable.svelte';
	import { onMount } from 'svelte';

    let { query = $bindable('') } = $props()
    let results: ResultsTable

    function keyUp(e: KeyboardEvent) {
        if(e.key == ';') results.runQuery(query)
    }

    onMount(() => {
        if(query.includes(';')) results.runQuery(query)
    })
</script>

<div class="flex-1 grid grid-rows-2 @sm:grid-rows-1 grid-cols-1 @sm:grid-cols-2 items-stretch justify-stretch p-3 gap-3 h-full max-h-[calc(100%-(var(--spacing)*6))]">
    <textarea {...input.input('resize-none flex-1 font-mono')} bind:value={query} onkeyup={keyUp}></textarea>
    <div {...card.root('border overflow-scroll p-0')}>
        <ResultsTable bind:this={results}/>
    </div>
</div>