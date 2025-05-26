<script lang="ts">
    import { scale } from 'svelte/transition';
    import DraggableTitlebar from "./DraggableTitlebar.svelte";
	import { card } from "@pacuare/design"
	import type { Snippet } from 'svelte';

    let left = $state(100)
    let top = $state(100)

    let div: HTMLDivElement

    let { children, height = 200, width = 300 }: { children: Snippet, height?: number, width?: number } = $props()

    $effect(() => {
        div.style.left = left + 'px'
        div.style.top = top + 'px'
    })
</script>

<div transition:scale bind:this={div} {...card.root('@container min-w-[100px] flex flex-col bg-white items-stretch shadow-lg absolute p-0 resize overflow-hidden z-45')} style={`height: ${height}px; width: ${width}px;`}>
    <DraggableTitlebar bind:left={left} bind:top={top}/>
    {@render children()}
</div>