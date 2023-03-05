import "dotenv/config";
import { defineConfig } from "vite";
import { sveltekit } from "@sveltejs/kit/vite";
process.env = Object.fromEntries(Object.entries(process.env).filter(x => ["DATABASE_URL", "NODE_ENV", "VERSION"].includes(x[0])));

export default defineConfig({
    server: { port: 8080 },
    plugins: [sveltekit()],
});
