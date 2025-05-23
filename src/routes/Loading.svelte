<script>
	import { backdrop } from "$lib/components/modal";
	import { spinner } from "$lib/components/spinner";
    import { LoaderCircle } from "@lucide/svelte"

</script>
<div {...backdrop()}>
    <LoaderCircle {...spinner('size-6')}/>
</div>