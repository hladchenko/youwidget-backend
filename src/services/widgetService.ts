import type {
  WidgetType,
  CreateWidgetRequestType,
  UpdateWidgetRequestType,
} from "../types/WidgetType.js";

let widgets: WidgetType[] = [];
let nextId = 1;

const getAllWidgets = (): WidgetType[] => {
  return widgets;
};

const getWidgetById = (id: string): WidgetType | null => {
  return widgets.find((widget) => widget.id === id) || null;
};

const createWidget = (data: CreateWidgetRequestType): WidgetType => {
  const now = new Date().toISOString();
  const newWidget: WidgetType = {
    id: nextId.toString(),
    name: data.name,
    ...(data.description !== undefined && { description: data.description }),
    createdAt: now,
    updatedAt: now,
  };

  widgets.push(newWidget);
  nextId++;

  return newWidget;
};

const updateWidget = (
  id: string,
  data: UpdateWidgetRequestType,
): WidgetType | null => {
  const widgetIndex = widgets.findIndex((widget) => widget.id === id);

  if (widgetIndex === -1) {
    return null;
  }

  const updatedWidget: WidgetType = {
    ...widgets[widgetIndex],
    ...data,
    name: data.name ?? widgets[widgetIndex]!.name,
    updatedAt: new Date().toISOString(),
  };

  widgets[widgetIndex] = updatedWidget;
  return updatedWidget;
};

const deleteWidget = (id: string): boolean => {
  const widgetIndex = widgets.findIndex((widget) => widget.id === id);

  if (widgetIndex === -1) {
    return false;
  }

  widgets.splice(widgetIndex, 1);
  return true;
};

export {
  getAllWidgets,
  getWidgetById,
  createWidget,
  updateWidget,
  deleteWidget,
};
