<script lang="ts">
    import pacuare from "$lib/python/pacuare.py?raw"
    import app from "$lib/python/app.py?raw"
</script>

<svelte:head>
    <script type="module" crossorigin src="https://cdn.jsdelivr.net/npm/@gradio/lite/dist/lite.js"></script>
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@gradio/lite/dist/lite.css" />
</svelte:head>

<gradio-lite playground class="flex-1 w-full">
    <gradio-requirements>
        pandas
    </gradio-requirements>
    <gradio-file name="pacuare.py">{pacuare}</gradio-file>
    {app}
</gradio-lite>