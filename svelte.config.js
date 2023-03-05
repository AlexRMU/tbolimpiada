import adapter from "@sveltejs/adapter-node";
import preprocess from "svelte-preprocess";

/** @type {import("@sveltejs/kit").Config} */
const config = {
    compilerOptions: {},
    preprocess: preprocess({
        typescript: true,
        globalStyle: true,
    }),
    kit: {
        adapter: adapter({ out: "build", precompress: true }),
        version: { name: Date.now() + "", pollInterval: 60 * 1000 },
        inlineStyleThreshold: 1024,
        csrf: { checkOrigin: false },
        csp: {
            mode: "auto",
            directives: {
                "img-src": ["self", "data:", "https://*.maps.yandex.net", "https://api-maps.yandex.ru", "https://yandex.ru"],
                "child-src": ["self", "https://api-maps.yandex.ru"],
                "frame-src": ["self", "https://api-maps.yandex.ru"],
                "script-src": ["self", "https://api-maps.yandex.ru", "https://suggest-maps.yandex.ru", "http://*.maps.yandex.net", "https://yandex.ru", "https://yastatic.net"],
                "connect-src": ["self", "https://api-maps.yandex.ru", "https://suggest-maps.yandex.ru", "https://*.maps.yandex.net", "https://yandex.ru", "https://*.taxi.yandex.net"],
                "style-src": ["self", "blob:"],
            }
        },
        files: {
            hooks: { server: "./src/hooks.server.ts" },
            lib: "./src/lib/",
            routes: "./src/routes/",
            appTemplate: "./src/index.html",
            errorTemplate: "./src/error.html",
        },
    },
};

export default config;
