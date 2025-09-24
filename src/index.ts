import Fastify from "fastify";
import dbConnector from "./plugins/dbConnector.js";
import widgetRoutes from "./routes/widgetRoutes.js";
import cors from "@fastify/cors";

const fastify = Fastify({
  logger: true,
});

fastify.register(cors, {
  origin: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS']
});

fastify.register(dbConnector);
fastify.register(widgetRoutes, { prefix: "/widgets" });

const start = async () => {
  try {
    await fastify.listen({ port: 8080 });
    console.log("Server running on http://localhost:8080");
  } catch (err) {
    fastify.log.error(err);
    process.exit(1);
  }
};

start();
