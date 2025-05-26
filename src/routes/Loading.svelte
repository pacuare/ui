<script>
	import { modal, spinner } from "@pacuare/design"
    import { LoaderCircle } from "@lucide/svelte"

</script>
<div {...modal.backdrop()}>
    <LoaderCircle {...spinner.spinner('size-6')}/>
</div>