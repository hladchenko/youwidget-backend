import type { FastifyInstance } from "fastify";
import {
  createWidget,
  deleteWidget,
  getAllWidgets,
  getWidgetById,
  updateWidget,
} from "../controllers/widgetController.js";
import {
  CreateWidgetRequest,
  UpdateWidgetRequest,
} from "../types/WidgetType.js";

const widgetRoutes = async (fastify: FastifyInstance) => {
  fastify.get("/", getAllWidgets);

  fastify.get(
    "/:id",
    {
      schema: {
        params: {
          type: "object",
          properties: {
            id: { type: "string" },
          },
          required: ["id"],
        },
      },
    },
    getWidgetById,
  );

  fastify.post(
    "/",
    {
      schema: {
        body: CreateWidgetRequest,
      },
    },
    createWidget,
  );

  fastify.put(
    "/:id",
    {
      schema: {
        params: {
          type: "object",
          properties: {
            id: { type: "string" },
          },
          required: ["id"],
        },
        body: UpdateWidgetRequest,
      },
    },
    updateWidget,
  );

  fastify.delete(
    "/:id",
    {
      schema: {
        params: {
          type: "object",
          properties: {
            id: { type: "string" },
          },
          required: ["id"],
        },
      },
    },
    deleteWidget,
  );
};

export default widgetRoutes;
