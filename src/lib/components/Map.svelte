<script lang="ts">
    import { onMount } from "svelte";
    import { browser } from "$app/environment";
    import { load_script, prod, add_toast } from "$lib/client_utils";
    import type Ymaps from "yandex-maps";
    export let content: any;
    export let data: SportObject[];
    const window2: { ymaps: typeof Ymaps | undefined } = browser ? (window as any) : {};
    let map: Ymaps.Map | undefined = undefined;
    let map_elem: HTMLElement;
    let map_loaded = false;

    const url = `https://api-maps.yandex.ru/2.1.79/?lang=ru_RU&csp=${prod ? true : false}&mode=${prod ? "release" : "debug"}`;
    onMount(async () => {
        if (!browser) return;
        window.onerror = (event) => add_toast(event, "error");
        if (!window2.ymaps) await load_script(url);
        if (!window2.ymaps) return;
        const ymaps = window2.ymaps;
        await ymaps.ready();
        map_loaded = true;
        console.info("ymaps", ymaps);

        map = new ymaps.Map(
            map_elem,
            {
                center: [55.7522, 37.6156],
                zoom: 3,
                controls: ["zoomControl", "typeSelector", "fullscreenControl"],
            },
            {
                autoFitToViewport: "always",
            }
        );
        console.info("map", map);

        const collection = new ymaps.GeoObjectCollection();
        const marks = data
            .map((obj) => {
                const x = obj.yandex_object_x_coord;
                const y = obj.yandex_object_y_coord;
                if (!x || !y) return;
                const mark = new ymaps.Placemark(
                    [y, x],
                    {
                        clusterCaption: "clusterCaption",
                        balloonContentHeader: obj.name,
                        balloonContentBody: obj.short_description,
                        balloonContentFooter: obj.address,
                        name: obj.name,
                        description: obj.short_description,
                        _id: obj._id,
                    },
                    {
                        preset: "islands#blueIcon",
                    }
                );
                mark.events.add(["balloonopen", "balloonclose"], (event: any) => {
                    content = {
                        json:
                            event.originalEvent.type == "balloonopen"
                                ? data.find((x) => x._id == event.originalEvent.currentTarget.properties._data._id) || {}
                                : {},
                    };
                });
                collection.add(mark);
                return mark;
            })
            .filter((x) => x) as Ymaps.Placemark[];
        map.geoObjects.add(collection as any);

        function provider(suggest?: boolean) {
            return function (request: string, options: { results?: number; skip?: number } = {}) {
                const deferred = new ymaps.vow.Deferred();
                const limit = options?.results || 10;
                const offset = options?.skip || 0;
                const reg = new RegExp(request, "gi");
                if (suggest) {
                    deferred.resolve(
                        data
                            .filter((x) => reg.test(x.name || ""))
                            .slice(offset, offset + limit)
                            .map((x) => ({ displayName: x.name, value: request }))
                    );
                } else {
                    const new_collection = new ymaps.GeoObjectCollection();
                    for (let i = 0; i < data.length; i++) {
                        if (new_collection.getLength() >= limit) break;
                        if (reg.test(data[i]?.name || "")) {
                            const mark = marks.find((x) => (x as any).properties._data._id == data[i]!._id);
                            if (mark) new_collection.add(mark);
                        }
                    }
                    deferred.resolve({
                        geoObjects: new_collection,
                        metaData: {
                            geocoder: {
                                request: request,
                                results: limit,
                                skip: offset,
                                found: new_collection.getLength(),
                            },
                        },
                    });
                }
                return deferred.promise();
            };
        }
        const search = new ymaps.control.SearchControl({
            options: {
                placeholderContent: "Поиск объектов по названию",
                provider: {
                    geocode: provider() as any,
                    suggest: provider(true) as any,
                },
            },
        });
        map.controls.add(search);
    });
</script>

{#if !map_loaded}
    Загрузка...
{/if}
<div class="map" bind:this={map_elem} />

<style>
    .map {
        min-height: 500px;
        height: 100%;
        width: 100%;
        flex-basis: 0px;
        flex-grow: 1;
    }
</style>
