<script lang="ts">
	import { modal, card, button, input, banner, spinner } from "@pacuare/design"
	import { m } from "$lib/paraglide/messages";
	import { LogOut, Plus, Trash } from "@lucide/svelte";
	import { deleteKey, getKey, getKeys, logOut } from "$lib/api/auth";
	import { client } from "$lib/api/client";
	import { goto } from "$app/navigation";
	import { onMount } from "svelte";
    import * as db from '$lib/api/db'
	import Dialog from "./Dialog.svelte";
	import { fade } from "svelte/transition";

    let keys: [number, string, string][] = $state([])
    let loading = $state(false)

    async function logoutClick() {
        await logOut(client)
        goto('/login')
    }

    async function refreshKeys() {
        keys = await getKeys(client);
    }

    async function deleteClick(id: number) {
        await deleteKey(client, id)
        refreshKeys();
    }

    let createdKey = $state<string>()
    let keyDesc = $state('')

    async function addKey(e: Event) {
        e.preventDefault()
        createdKey = await getKey(client, keyDesc)
        refreshKeys()
    }

    async function refresh() {
        if(!confirm("Are you sure you want to refresh your data? This will clear any modifications you have made.")) return
        loading = true
        await db.refresh(client);
        loading = false
    }

    async function recreate() {
        if(!confirm("Are you sure you want to recreate your database? This action cannot be undone. This will delete and recreate your database, removing any modifications, functions, procedures, views, or other structures you have created.")) return
        loading = true
        await db.recreate(client);
        window.location.reload();
    }

    onMount(() => {
        refreshKeys()
    })
</script>

<Dialog height={400} width={600}>
    <div class="flex flex-col flex-1 px-3 gap-3 overflow-auto">
        <h2 {...card.title('text-center sticky top-0 pt-3 bg-white/50 [backdrop-filter:blur(3px)]')}>{m.account_settings()}</h2>

        <div {...card.root()}>
            <h3 {...card.title('text-md')}>{m.personal_db()}</h3>
            <p {...card.description('mb-4')}>{m.personal_db_sync()}</p>
            <div class="flex flex-row gap-2">
                <button {...button.button('primary')()} onclick={refresh}>{m.refresh_db()}</button>
                <button {...button.button('outline')()} onclick={recreate}>{m.recreate_db()}</button>
            </div>
        </div>

        <div {...card.root()}>
            <h3 {...card.title('text-md')}>{m.api_keys()}</h3>
            <p {...card.description('mb-4')}>{m.access_your_data()}</p>

            {#if createdKey}
                <div {...banner.banner('success')('mb-3')}>
                    Your new API key is <code>{createdKey}</code>. Store it somewhere safe &mdash; it won't be shown again.
                </div>
            {/if}

            <div class="flex flex-col gap-3">
                {#each keys as key}
                    <div class="flex flex-row items-center gap-2 justify-between">
                        <p>{key[1]}</p>
                        <div class="flex flex-row gap-2 items-center">
                            <p>{key[2]}</p>
                            <button {...button.button('outline')()} onclick={() => deleteClick(key[0])}>
                                <Trash class="size-4"/>
                            </button>
                        </div>
                    </div>
                {/each}

                <form onsubmit={addKey} class="flex flex-row gap-2 items-stretch">
                    <input {...input.input('block flex-1')} placeholder={m.description()} bind:value={keyDesc}>
                    <button {...button.button('primary')()} type="submit">
                        <Plus class="size-4"/>
                    </button>
                </form>
            </div>
        </div>

        <button {...button.button('outline')('self-end')} onclick={logoutClick}><LogOut class="size-4"/></button>
    </div>
</Dialog>

{#if loading}
<div {...modal.backdrop()} transition:fade>
    <div {...spinner.spinner()}></div>
</div>
{/if}