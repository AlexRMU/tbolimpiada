import { prod } from "$lib/client_utils";
import { sequence } from "@sveltejs/kit/hooks";
import type { Handle } from "@sveltejs/kit";
//@ts-expect-error
import { minify } from "html-minifier-terser";

const html: Handle = async ({ event, resolve }) => {
    let document = "";
    let res = await resolve(event, {
        preload: ({ type }) => type != "asset",
        transformPageChunk: async ({ html, done }) => {
            document = document + html;
            if (done) {
                if (prod) {
                    return await minify(document, {
                        collapseInlineTagWhitespace: true,
                        collapseWhitespace: true,
                        continueOnParseError: true,
                        decodeEntities: true,
                        removeAttributeQuotes: true,
                        removeComments: true,
                        removeEmptyAttributes: true,
                        removeOptionalTags: true,
                        removeRedundantAttributes: true,
                        removeScriptTypeAttributes: true,
                        removeStyleLinkTypeAttributes: true,
                        sortAttributes: true,
                        sortClassName: true,
                    });
                }
                return document;
            }
        }
    });
    return res;
};
export const handle = sequence(html);
