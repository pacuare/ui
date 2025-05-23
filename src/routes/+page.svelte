<script lang="ts">
	import { goto } from "$app/navigation";
	import { type AccessInfo, getAccess, logOut } from "$lib/api/auth";
	import { client } from "$lib/api/client";
	import { button } from "$lib/components/button";
	import { onMount } from "svelte";
	import AuthenticatedHome from "./AuthenticatedHome.svelte";
	import Loading from "./Loading.svelte";
	import { fade } from "svelte/transition";

    let access = $state<AccessInfo>()

    onMount(async () => {
        try {
            access = await getAccess(client)
        } catch (e) {
            goto('/login')
        }
    })
</script>

{#if access != undefined}
<main class="flex w-screen h-screen items-stretch justify-stretch" transition:fade>
    <AuthenticatedHome {access} />
</main>
{:else}
<div transition:fade>
    <Loading/>
</div>
{/if}