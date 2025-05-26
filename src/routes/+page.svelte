<script lang="ts">
	import { goto } from "$app/navigation";
	import { type AccessInfo, getAccess, logOut } from "$lib/api/auth";
	import { client } from "$lib/api/client";
	import { onMount } from "svelte";
	import AuthenticatedHome from "./AuthenticatedHome.svelte";
	import Loading from "./Loading.svelte";
	import { fade } from "svelte/transition";
	import * as db from "$lib/api/db";
	import { spinner } from "@pacuare/design";
	import { LoaderCircle } from "@lucide/svelte";

    let access = $state<AccessInfo>()
    let creatingDB = $state(false)

    onMount(async () => {
        try {
            access = await getAccess(client)
        } catch (e) {
            goto('/login')
        }

        if(!await db.exists(client)) {
            creatingDB = true
            await db.create(client)
            creatingDB = false
        }
    })
</script>

{#if creatingDB}
    <main class="flex flex-col gap-3 p-3 flex-1 w-screen h-screen items-center justify-center">
        <div {...spinner.spinner()}>
            <LoaderCircle/>
        </div>
        <h2 class="font-bold">Welcome to Pacuare Reserve!</h2>
        <p>Please wait while we set up your account...</p>
    </main>
{:else if access != undefined}
<main class="flex flex-1 w-screen h-screen items-stretch justify-stretch" transition:fade>
    <AuthenticatedHome {access} />
</main>
{:else}
<div transition:fade>
    <Loading/>
</div>
{/if}