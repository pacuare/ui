<script lang="ts">
	import { type AccessInfo } from "$lib/api/auth";
	import { Settings } from "@lucide/svelte";
	import AccessBanner from "./AccessBanner.svelte";
	import AccountSettings from "./AccountSettings.svelte";
	import { button } from "$lib/components/button";

    let settingsOpen = $state(false)
    let {access}: {access: AccessInfo} = $props()
</script>

<div class="flex flex-1 w-screen flex-col gap-3 items-stretch p-3">
    <div class="flex flex-row gap-3 justify-stretch">
        <AccessBanner {access}/>
        <button {...button('outline')()} onclick={() => settingsOpen = !settingsOpen}><Settings class="size-4"/></button>
    </div>
</div>

<AccountSettings bind:open={settingsOpen}/>