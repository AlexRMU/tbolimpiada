import type { PageLoad } from "./$types";
export const load = (async ({ fetch }) => {
    return {
        data: await fetch("/api/sportobject").then((x) => x.json()),
    };
}) satisfies PageLoad;
