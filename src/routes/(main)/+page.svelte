<script lang="ts">
    import { SvelteToast } from "@zerodevx/svelte-toast";
    import Editor from "$lib/components/Editor.svelte";
    import Map from "$lib/components/Map.svelte";
    import Charts from "$lib/components/Charts.svelte";
    import type { PageData } from "./$types";
    export let data: PageData;
    let my_data: SportObject[] = [];
    let content: any = {
        json: {
            "": "Для изменения объекта, его нужно выбрать на карте, а после изменения нажать на кнопку справа вверху.",
        },
    };
    $: {
        my_data = data.data;
        console.info("data", my_data);
    }
</script>

<div class="toast">
    <SvelteToast />
</div>

<h3>Объекты спорта</h3>
<div class="main">
    {#if my_data.length > 0}
        <div class="div1">
            <Map bind:content bind:data={my_data} />
            <Editor bind:content />
        </div>
        <h3>Инфографика</h3>
        <Charts bind:data={my_data} />
    {/if}
</div>

<style>
    :global(body) {
        margin: 0;
    }
    .toast {
        --toastColor: #161616;
        --toastContainerLeft: auto;
        --toastContainerTop: auto;
        --toastContainerRight: 1rem;
        --toastContainerBottom: 1rem;
    }
    h3 {
        text-align: center;
    }
    .main {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        gap: 20px;
        max-width: 1800px;
        width: 75%;
        margin: 0 auto;
    }
    .div1 {
        display: flex;
        flex-direction: row;
        justify-content: center;
        align-items: stretch;
        gap: 20px;
        width: 100%;
    }
    @media (max-width: 1600px) {
        .main {
            gap: 10px;
            width: 90%;
        }
        .div1 {
            flex-direction: column;
            gap: 10px;
        }
    }
</style>
