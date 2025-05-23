<script lang="ts">
	import type { AccessInfo } from "$lib/api/auth";
	import { banner } from "$lib/components/banner";
	import { m } from "$lib/paraglide/messages";
	import { ShieldAlert, ShieldCheck } from "@lucide/svelte";

    let {access}: {access: AccessInfo} = $props()
</script>

<div {...banner(access.access_level == 'full' ? 'danger' : 'success')('flex-1 flex flex-row gap-2 items-center')}>
    {#if access.access_level == 'full'}
        <ShieldAlert class='size-4' />
        {m.full_access(access)}
    {:else}
        <ShieldCheck class='size-4' />
        {m.restricted_access(access)}
    {/if}
</div>