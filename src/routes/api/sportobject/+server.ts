import type { RequestHandler } from './$types';
import { error, json } from "@sveltejs/kit";
import { get_collections } from "$lib/server/server_utils";
import { definitions, type Definitions } from "$lib/client_utils";
const { SportObject } = get_collections();

export const GET = (async (event) => {
    return json(await SportObject.find().lean().exec());
}) satisfies RequestHandler;

export const POST = (async (event) => {
    const body = await event.request.json();
    const obj = await SportObject.findById(body._id).exec();
    if (obj) {
        Object.keys(definitions).map((key) => {
            const k = key as keyof Definitions;
            if (k in body && typeof body[key] == definitions[k].type) {
                obj[k] = body[key];
            }
        });
        await obj.save();
        return json({});
    }
    throw error(400);
}) satisfies RequestHandler;
