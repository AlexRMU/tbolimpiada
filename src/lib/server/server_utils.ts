console.clear();
console.info("start");
//@ts-expect-error
import { DATABASE_URL } from "$env/static/private";
import mongoose from "mongoose";
import { definitions } from "$lib/client_utils";

let created = false;
export function get_collections(): { SportObject: mongoose.Model<SportObject>; } {
    if (created) {
        return {
            SportObject: mongoose.models.SportObject!,
        };
    } else {
        const SportObject_schema = new mongoose.Schema<SportObject>(
            Object.fromEntries(
                Object.entries(definitions).map((x) => [x[0], x[1].type == "string" ? { type: String } : { type: Number }])
            ),
            { collection: "sports" }
        );
        const obj = {
            SportObject: mongoose.model("SportObject", SportObject_schema),
        };
        created = true;
        return obj;
    }
}

function exit(error: any): never {
    console.error("exit", error);
    process.exit(-1);
}
function init_db() {
    try {
        mongoose.set("bufferCommands", true);
        mongoose.set("bufferTimeoutMS", 30000);
        mongoose.set("strictQuery", true);
        mongoose.set("strict", true);
        mongoose.set("allowDiskUse", true);
        mongoose.connect(DATABASE_URL, {
            maxPoolSize: 500,
            minPoolSize: 1,
            socketTimeoutMS: 30000,
            serverSelectionTimeoutMS: 30000,
        });
        mongoose.connection.on("error", (error) => {
            throw error;
        });
        mongoose.deleteModel(/.+/);
        get_collections();
    } catch (error) {
        exit(error);
    }
}
init_db();
