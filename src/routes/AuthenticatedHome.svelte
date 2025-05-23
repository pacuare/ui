<script lang="ts">
	import { goto } from "$app/navigation";
	import { logOut, type AccessInfo } from "$lib/api/auth";
	import { client } from "$lib/api/client";
	import { button } from "$lib/components/button";

    let {access}: {access: AccessInfo} = $props()

    async function logoutClick() {
        await logOut(client)
        goto('/login')
    }
</script>

<div class="flex flex-col">
    Hello, {access.email}

    <button {...button('outline')()} onclick={logoutClick}>Log Out</button>
</div>