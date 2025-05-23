<script lang="ts">
	import { goto } from "$app/navigation";
	import { type AccessInfo, getAccess, logOut } from "$lib/api/auth";
	import { client } from "$lib/api/client";
	import { button } from "$lib/components/button";
	import { onMount } from "svelte";

    let access = $state<AccessInfo>()
    
    async function logoutClick() {
        await logOut(client)
        goto('/login')
    }

    onMount(async () => {
        try {
            access = await getAccess(client)
        } catch (e) {
            goto('/login')
        }
    })
</script>

{#if access != undefined}
Hello, {access?.email}

<button {...button('outline')()} onclick={logoutClick}>Log Out</button>
{/if}