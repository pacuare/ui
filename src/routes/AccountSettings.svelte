<script lang="ts">
	import { backdrop } from "$lib/components/modal";
    import * as card from "$lib/components/card";
	import { m } from "$lib/paraglide/messages";
	import { button } from "$lib/components/button";
	import { LogOut } from "@lucide/svelte";
	import { logOut } from "$lib/api/auth";
	import { client } from "$lib/api/client";
	import { goto } from "$app/navigation";
	import { fade } from "svelte/transition";

	let { open = $bindable() }: { open: boolean } = $props()

    let language = $state()

    async function logoutClick() {
        await logOut(client)
        goto('/login')
    }
</script>

{#if open}
<div {...backdrop()} onclick={() => open = false} transition:fade>
    <dialog {open} {...card.root('w-lg m-auto')}>
        <h2 {...card.title()}>{m.account_settings()}</h2>
        <button {...button('outline')()} onclick={logoutClick}><LogOut class="size-4"/></button>
    </dialog>
</div>
{/if}