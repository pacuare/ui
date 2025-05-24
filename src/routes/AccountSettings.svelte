<script lang="ts">
	import { backdrop } from "$lib/components/modal";
    import * as card from "$lib/components/card";
	import { m } from "$lib/paraglide/messages";
	import { button } from "$lib/components/button";
	import { LogOut, Plus, Trash } from "@lucide/svelte";
	import { deleteKey, getKey, getKeys, logOut } from "$lib/api/auth";
	import { client } from "$lib/api/client";
	import { goto } from "$app/navigation";
	import { fade } from "svelte/transition";
	import { onMount } from "svelte";
	import { input } from "$lib/components/input";
	import { banner } from "$lib/components/banner";

	let { open = $bindable() }: { open: boolean } = $props()

    let keys: [number, string, string][] = $state([])

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

    onMount(() => {
        refreshKeys()
    })
</script>

{#if open}
<div {...backdrop('z-50')} onclick={() => {open = false; createdKey = undefined}} transition:fade>
    <dialog {open} {...card.root('w-md m-auto shadow flex flex-col gap-2 z-55')} onclick={e => e.stopPropagation()}>
        <h2 {...card.title('text-center')}>{m.account_settings()}</h2>

        <div {...card.root()}>
            <h3 {...card.title('text-md')}>{m.api_keys()}</h3>
            <p {...card.description('mb-4')}>{m.access_your_data()}</p>

            {#if createdKey}
                <div {...banner('success')('mb-3')}>
                    Your new API key is <code>{createdKey}</code>. Store it somewhere safe &mdash; it won't be shown again.
                </div>
            {/if}

            <div class="flex flex-col gap-3">
                {#each keys as key}
                    <div class="flex flex-row items-center gap-2 justify-between">
                        <p>{key[1]}</p>
                        <div class="flex flex-row gap-2 items-center">
                            <p>{key[2]}</p>
                            <button {...button('outline')()} onclick={() => deleteClick(key[0])}>
                                <Trash class="size-4"/>
                            </button>
                        </div>
                    </div>
                {/each}

                <form onsubmit={addKey} class="flex flex-row gap-2 items-stretch">
                    <input {...input('block flex-1')} placeholder={m.description()} bind:value={keyDesc}>
                    <button {...button('primary')()} type="submit">
                        <Plus class="size-4"/>
                    </button>
                </form>
            </div>
        </div>

        <button {...button('outline')('self-end')} onclick={logoutClick}><LogOut class="size-4"/></button>
    </dialog>
</div>
{/if}