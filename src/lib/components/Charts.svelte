<script lang="ts">
    import { browser } from "$app/environment";
    import { onMount } from "svelte";
    import type * as ApexCharts from "apexcharts";
    export let data: SportObject[];
    let apexcharts: typeof ApexCharts.default | undefined = undefined;
    let loading = true;
    const charts = get_charts();

    function get_charts() {
        let charts: ApexCharts.ApexOptions[] = [];

        charts.push({
            chart: { type: "treemap" },
            title: { text: "Количество", align: "center" },
            series: [{ data: [{ x: "Всего", y: data.length }] }],
        });

        let active = data.filter((x) => x.active == "Y").length;
        let not_active = data.filter((x) => x.active == "N").length;
        charts.push({
            chart: { type: "pie" },
            title: { text: "Активность", align: "center" },
            labels: ["Активные", "Неактивные", "Неизвестно"],
            series: [active, not_active, data.length - active - not_active],
        });

        let s1 = data.filter((x) => x.activities == "строительство").length;
        let s2 = data.filter((x) => x.activities == "реконструкция").length;
        charts.push({
            chart: { type: "pie" },
            title: { text: "Статусы", align: "center" },
            labels: ["Строительство", "Реконструкция", "Другой"],
            series: [s1, s2, data.length - s1 - s2],
        });

        charts.push({
            chart: { type: "treemap" },
            title: { text: "Площади", align: "center" },
            series: [{ data: data.filter((x) => x.area).map((x) => ({ x: x.name || "", y: x.area || 0 })) }],
        });

        s1 = data.filter((x) => x.competitions == "всероссийские").length;
        s2 = data.filter((x) => x.competitions == "всероссийские, мировые").length;
        charts.push({
            chart: { type: "pie" },
            title: { text: "Компетициии", align: "center" },
            labels: ["Всероссийские", "Всероссийские и мировые", "Другой"],
            series: [s1, s2, data.length - s1 - s2],
        });

        charts.push({
            chart: { type: "scatter", zoom: { enabled: true, type: "xy" } },
            title: { text: "Координаты", align: "center" },
            series: [{ data: data.map((x) => [x.yandex_object_x_coord || 0, x.yandex_object_y_coord || 0]) }],
        });

        s1 = data.filter((x) => x.significance == "регионально-значимый").length;
        s2 = data.filter((x) => x.significance == "федерально-значимый").length;
        charts.push({
            chart: { type: "pie" },
            title: { text: "Значимость", align: "center" },
            labels: ["Регионально-значимый", "Федерально-значимый", "Другая"],
            series: [s1, s2, data.length - s1 - s2],
        });

        let obj: any = {};
        data.map((x) => {
            let arr = (x.sports || "").match(/\s*([А-яё\s]+)(?:,|\s)*/g) || ["Другой"];
            arr.map((k) => {
                if (!(k in obj)) obj[k] = 0;
                obj[k]++;
            });
        });
        let kv = Object.entries(obj).sort((a: any, b: any) => b[1] - a[1]);
        charts.push({
            chart: { type: "bar", height: "100%" },
            title: { text: "Виды спорта", align: "center" },
            plotOptions: { bar: { horizontal: true } },
            dataLabels: { enabled: false },
            xaxis: { categories: kv.map((x) => x[0]) },
            series: [{ data: kv.map((x) => x[1]) as any }],
        });

        return charts;
    }
    function make_chart(element: HTMLElement, options: ApexCharts.ApexOptions) {
        if (!apexcharts) return;
        const chart = new apexcharts(element, options);
        chart.render();
        return { destroy: chart.destroy };
    }
    onMount(async () => {
        if (!browser) return;
        apexcharts = (await import("apexcharts")).default as any;
        loading = false;
    });
</script>

<div class="charts">
    {#if loading}
        Загрузка...
    {:else}
        {#each charts as chart, i}
            <div class="chart chart{i}" use:make_chart={chart} />
        {/each}
    {/if}
</div>

<style>
    .charts {
        height: 100%;
        width: 100%;
        display: flex;
        flex-wrap: wrap;
        flex-direction: row;
        align-items: center;
        justify-content: center;
    }
    .chart {
        max-height: 100vh;
        max-width: 100vw;
        width: 49%;
    }
    .chart7 {
        height: 1100px;
        width: 100%;
    }
    @media (max-width: 1600px) {
        .charts {
            flex-direction: column;
        }
        .chart {
            width: 80%;
        }
    }
</style>
