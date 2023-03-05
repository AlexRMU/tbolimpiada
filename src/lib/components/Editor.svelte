<script lang="ts">
    import { add_toast } from "$lib/client_utils";
    import { JSONEditor, type OnRenderMenu } from "svelte-jsoneditor";
    export let content: any;
    async function edit_json() {
        try {
            await fetch("/api/sportobject", {
                method: "POST",
                body: JSON.stringify(content.json),
            }).then((x) => (x.ok ? x.json() : Promise.reject(x.statusText)));
            add_toast("Успех", "success", 3000);
        } catch (error) {
            add_toast(error, "error", 4000);
        }
    }
    const menu: OnRenderMenu = function (items) {
        return [
            ...items,
            {
                type: "space",
                space: true,
            },
            {
                type: "button",
                onClick: edit_json,
                icon: {
                    prefix: "fas",
                    iconName: "w",
                    icon: [
                        20,
                        20,
                        [],
                        "",
                        `M5 21q-.825 0-1.413-.587Q3 19.825 3 19V5q0-.825.587-1.413Q4.175 3 5 3h11.175q.4 0 .763.15q.362.15.637.425l2.85 2.85q.275.275.425.637q.15.363.15.763V19q0 .825-.587 1.413Q19.825 21 19 21ZM19 7.85L16.15 5H5v14h14ZM12 18q1.25 0 2.125-.875T15 15q0-1.25-.875-2.125T12 12q-1.25 0-2.125.875T9 15q0 1.25.875 2.125T12 18Zm-5-8h7q.425 0 .713-.288Q15 9.425 15 9V7q0-.425-.287-.713Q14.425 6 14 6H7q-.425 0-.713.287Q6 6.575 6 7v2q0 .425.287.712Q6.575 10 7 10ZM5 7.85V19V5Z`,
                    ],
                },
                title: "Сохранить",
            },
        ];
    };
</script>

<div class="editor">
    <svelte:component this={JSONEditor} bind:content onRenderMenu={menu} />
</div>

<style>
    .editor {
        height: 100%;
        width: 100%;
        flex-basis: 0px;
        flex-grow: 1;
    }
</style>
