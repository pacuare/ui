<script lang="ts">
	import { goto } from "$app/navigation";
	import { getCode, verify } from "$lib/api/auth";
	import { client } from "$lib/api/client";
	import { banner } from "$lib/components/banner";
	import { button } from "$lib/components/button";
	import * as card from "$lib/components/card";
	import { input as formInput } from "$lib/components/input";
	import { link } from "$lib/components/link";
	import { m } from "$lib/paraglide/messages";
	import { PinInput } from "melt/builders";
	import { fly } from "svelte/transition";

	let email = $state('')
	let otpSending = $state(false)
	const otpInput = new PinInput({maxLength: 6})
	let otpVisible = $state(false)
	let errorVisible = $state(false)
	let signingIn = $state(false)

	async function sendOtp(e: Event) {
		e.preventDefault()
		otpSending = true
		try {
			await getCode(client, email)
			otpVisible = true
		} catch(e) {
			errorVisible = true
		} finally {
			otpSending = false
		}
	}

	async function logIn(e: Event) {
		e.preventDefault()
		try {
			signingIn = true
			await verify(client, email, otpInput.value)
			goto('/')
		} catch(e) {

		}
	}
</script>

<div class="m-auto max-w-sm mt-6 px-3">
	<div {...card.root('flex flex-col items-stretch gap-2')}>
		<p {...card.title()}>{m.log_in()}</p>

		{#if errorVisible}
			<div {...banner('danger')()} transition:fly>
				Failed to sign in with <strong>{email}</strong>; either this account does not exist or the credentials were incorrect.
				For more information on getting an account, please see the <a {...link()} href="https://pacuare.dev/en/latest/accounts.html">documentation</a>.
			</div>
		{/if}
		
		<form onsubmit={sendOtp} class="flex flex-row gap-2 justify-stretch">
			<input {...formInput('block flex-1')} type="email" placeholder={m.email()} bind:value={email} oninput={() => errorVisible = false} disabled={otpSending || otpVisible}>
			<button {...button('primary')('block')} type="submit" disabled={otpSending || otpVisible}>{m.log_in()}</button>
		</form>

		{#if otpVisible}
			<form onsubmit={logIn} class="flex flex-col gap-2" transition:fly>
				<p {...card.description('pb-1 pt-3')}>{m.enter_otp()}</p>
				<div {...otpInput.root} class="flex flex-row items-stretch gap-3">
					{#each otpInput.inputs as input}
						<input {...input} {...formInput('flex-1 min-w-2 text-center uppercase')}>
					{/each}
				</div>
				<button {...button('primary')()} type="submit">{m.log_in()}</button>
			</form>
		{/if}
	</div>
</div>