import type { FastifyReply, FastifyRequest } from "fastify";
import * as WidgetService from "../services/widgetService.js";
import type {
  CreateWidgetRequestType,
  UpdateWidgetRequestType,
} from "../types/WidgetType.js";

const getAllWidgets = async (request: FastifyRequest, reply: FastifyReply) => {
  try {
    const widgets = WidgetService.getAllWidgets(request.server.db);
    return reply.code(200).send(widgets);
  } catch (error) {
    request.log.error(error, "Error getting all widgets");
    return reply.code(500).send({
      success: false,
      message: "Internal server error",
    });
  }
};

const createWidget = async (
  request: FastifyRequest<{ Body: CreateWidgetRequestType }>,
  reply: FastifyReply,
) => {
  try {
    const widgetData = request.body;
    const newWidget = WidgetService.createWidget(request.server.db, widgetData);

    return reply.code(201).send(newWidget);
  } catch (error) {
    request.log.error(error, "Error creating widget");
    return reply.code(500).send({
      success: false,
      message: "Internal server error",
    });
  }
};

const updateWidget = async (
  request: FastifyRequest<{
    Params: { id: string };
    Body: UpdateWidgetRequestType;
  }>,
  reply: FastifyReply,
) => {
  try {
    const { id } = request.params;
    const updateData = request.body;

    const updatedWidget = WidgetService.updateWidget(
      request.server.db,
      id,
      updateData,
    );

    if (!updatedWidget) {
      return reply.code(404).send({
        success: false,
        message: "Widget not found",
      });
    }

    return reply.code(200).send(updatedWidget);
  } catch (error) {
    request.log.error(error, "Error updating widget");
    return reply.code(500).send({
      success: false,
      message: "Internal server error",
    });
  }
};

const deleteWidget = async (
  request: FastifyRequest<{ Params: { id: string } }>,
  reply: FastifyReply,
) => {
  try {
    const { id } = request.params;
    const deleted = WidgetService.deleteWidget(request.server.db, id);

    if (!deleted) {
      return reply.code(404).send({
        success: false,
        message: "Widget not found",
      });
    }

    return reply.code(200).send({
      success: true,
      message: "Widget deleted successfully",
    });
  } catch (error) {
    request.log.error(error, "Error deleting widget");
    return reply.code(500).send({
      success: false,
      message: "Internal server error",
    });
  }
};

export { getAllWidgets, createWidget, updateWidget, deleteWidget };
