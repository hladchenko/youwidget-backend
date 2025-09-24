import fastifyPlugin from "fastify-plugin";
import { DatabaseSync } from "node:sqlite";
import type { FastifyInstance } from "fastify";

async function dbConnector(fastify: FastifyInstance) {
  const database = new DatabaseSync(process.env.DATABASE_URL || "db.sqlite");

  database.exec(`
    CREATE TABLE IF NOT EXISTS widgets (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      title TEXT NOT NULL,
      description TEXT,
      json_data TEXT,
      type TEXT DEFAULT 'text',
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )
  `);

  fastify.decorate("db", database);
}

declare module "fastify" {
  interface FastifyInstance {
    db: DatabaseSync;
  }
}

export default fastifyPlugin(dbConnector);
