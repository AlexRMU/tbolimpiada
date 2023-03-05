/// <reference types="svelte" />
/// <reference types="vite/client" />
export { };
import { Definitions } from "$lib/client_utils";
declare global {
    declare namespace App {
        interface Locals {
            is_authorized: boolean;
        }
        interface Error {
            message: string;
            res?: string;
        }
    }
    type SportObject = {
        _id: string;
    } & { [key in keyof Definitions]?: Definitions[key]["type"] extends "string" ? string : number };
}
