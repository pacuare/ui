<script lang="ts">
    // https://svelte.dev/playground/7d674cc78a3a44beb2c5a9381c7eb1a9?version=5.33.1
	let {left = $bindable(100), top = $bindable(100)} = $props();
	
	let moving = $state(false);
	
	function onMouseDown() {
		moving = true;
	}
	
	function onMouseMove(e: MouseEvent) {
		if (moving) {
			left += e.movementX;
			top += e.movementY;
		}
	}
	
	function onMouseUp() {
		moving = false;
	}
</script>

<section role="alertdialog" onmousedown={onMouseDown} class="user-select-none cursor-move p-2 flex flex-row justify-center items-center group">
    <div class="max-w-[100px] h-[6px] flex-1 bg-gray-500 rounded-full group-hover:max-w-[150px] group-active:max-w-[125px] group-active:bg-gray-700 transition-all"></div>
</section>

<svelte:window onmouseup={onMouseUp} onmousemove={onMouseMove} />