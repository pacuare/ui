<script lang="ts">
	import { type AccessInfo } from "$lib/api/auth";
	import { Search, Settings } from "@lucide/svelte";
	import AccessBanner from "./AccessBanner.svelte";
	import AccountSettings from "./AccountSettings.svelte";
	import { button } from "$lib/components/button";
	import GradioLite from "./GradioLite.svelte";
	import QueryDialog from "./(query)/QueryDialog.svelte";

    let settingsOpen = $state(false)
    let queryOpen = $state(false)
    let query = $state('')
    let {access}: {access: AccessInfo} = $props()
</script>

<div class="flex flex-1 w-screen flex-col gap-3 items-stretch p-3">
    <div class="flex flex-row gap-3 justify-stretch">
        <AccessBanner {access}/>
        <button {...button('outline')(queryOpen ? 'bg-slate-800 text-white' : '')} onclick={() => queryOpen = !queryOpen}><Search class="size-4"/></button>
        <button {...button('outline')()} onclick={() => settingsOpen = !settingsOpen}><Settings class="size-4"/></button>
    </div>

    <div class="flex flex-1 w-full items-stretch justify-stretch">
        <GradioLite/>
    </div>
</div>

<AccountSettings bind:open={settingsOpen}/>

{#if queryOpen}
    <QueryDialog bind:query={query}/>
{/if}