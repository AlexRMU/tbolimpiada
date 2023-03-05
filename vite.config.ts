import "dotenv/config";
import { defineConfig } from "vite";
import { sveltekit } from "@sveltejs/kit/vite";
import child_process from "child_process";
process.env.VERSION = process.env.VERSION || process.env.GITHUB_SHA || child_process.execSync("git rev-parse HEAD").toString().trim();
process.env = Object.fromEntries(Object.entries(process.env).filter(x => ["DATABASE_URL", "NODE_ENV", "VERSION"].includes(x[0])));

export default defineConfig({
    server: { port: 8080 },
    plugins: [sveltekit()],
});
