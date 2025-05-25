<script lang="ts">
    import { scale } from 'svelte/transition';
    import DraggableTitlebar from "../DraggableTitlebar.svelte";
	import { input } from '$lib/components/input';
    import * as card from '$lib/components/card'
	import ResultsTable from './ResultsTable.svelte';
	import { onMount } from 'svelte';

    let left = $state(100)
    let top = $state(100)

    let div: HTMLDivElement

    let { query = $bindable('') } = $props()
    let results: ResultsTable

    function keyUp(e: KeyboardEvent) {
        if(e.key == ';') results.runQuery(query)
    }

    $effect(() => {
        div.style.left = left + 'px'
        div.style.top = top + 'px'
    })

    onMount(() => {
        if(query.includes(';')) results.runQuery(query)
    })
</script>

<div transition:scale bind:this={div} {...card.root('@container min-w-[100px] flex flex-col bg-white items-stretch shadow-lg absolute p-0 resize overflow-hidden z-45')} style="height:200px; width: 300px;">
    <DraggableTitlebar bind:left={left} bind:top={top}/>
    <div class="flex-1 grid grid-rows-2 @sm:grid-rows-1 grid-cols-1 @sm:grid-cols-2 items-stretch justify-stretch p-3 gap-3 h-full max-h-[calc(100%-(var(--spacing)*6))]">
        <textarea {...input('resize-none flex-1 font-mono')} bind:value={query} onkeyup={keyUp}></textarea>
        <div {...card.root('rounded border overflow-scroll p-0')}>
            <ResultsTable bind:this={results}/>
        </div>
    </div>
</div>