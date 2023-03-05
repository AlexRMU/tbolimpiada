import "dotenv/config";
//@ts-expect-error
import { handler } from "./handler.js";
import fastify from "fastify";
import rate_limit from "@fastify/rate-limit";
import helmet from "@fastify/helmet";
const max_body = 1024 * 1024 * 10;
console.log("starting");

(async () => {
    try {
        const app = fastify({
            connectionTimeout: 0,
            keepAliveTimeout: 5000,
            maxRequestsPerSocket: 0,
            requestTimeout: 0,
            bodyLimit: max_body,
            ignoreTrailingSlash: true,
            disableRequestLogging: false,
        });
        app.removeAllContentTypeParsers();
        app.addContentTypeParser("*", (req, payload, done) => done(null, null));
        //@ts-expect-error
        await app.register(rate_limit, {
            cache: 10000,
            allowList: ["127.0.0.1", "localhost"],
            keyGenerator: (req) => {
                const key = req.headers["x-forwarded-for"] || req.headers["x-real-ip"] || req["ip"];
                return Array.isArray(key) ? key[0] : key;
            },
        });
        await app.register(helmet, { contentSecurityPolicy: false, crossOriginEmbedderPolicy: false });
        app.get("/check", async (req, res) => {
            return "ok";
        });
        app.get("/429", {
            config: {
                rateLimit: {
                    max: async (req, key) => {
                        return 100;
                    },
                    timeWindow: 1000 * 60,
                }
            },
        }, (req, res) => {
            handler(req.raw, res.raw);
        });
        app.all("/*", {
            config: {
                rateLimit: {
                    max: async (req, key) => {
                        if (req.url.startsWith("/api/")) {
                            return 500;
                        } else {
                            return 1000;
                        }
                    },
                    timeWindow: 1000 * 60,
                }
            },
            errorHandler: (error, req, res) => {
                if (error.message.startsWith("Rate limit exceeded")) {
                    res.code(301).redirect("/429");
                } else {
                    throw error;
                }
            }
        }, (req, res) => {
            handler(req.raw, res.raw);
        });
        await app.listen({ port: parseInt(process.env.PORT || "") || 8080, host: "0.0.0.0" });
        console.log("started");
    } catch (error) {
        console.error(error);
    }
})();
