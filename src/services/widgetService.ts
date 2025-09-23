import type { DatabaseSync } from "node:sqlite";
import type {
  WidgetType,
  CreateWidgetRequestType,
  UpdateWidgetRequestType,
} from "../types/WidgetType.js";
import { WidgetRepository } from "../repositories/WidgetRepository.js";

const getAllWidgets = (db: DatabaseSync): WidgetType[] => {
  const repository = new WidgetRepository(db);
  return repository.findAll();
};

const createWidget = (
  db: DatabaseSync,
  data: CreateWidgetRequestType,
): WidgetType => {
  const repository = new WidgetRepository(db);
  return repository.create(data);
};

const updateWidget = (
  db: DatabaseSync,
  id: string,
  data: UpdateWidgetRequestType,
): WidgetType | null => {
  const repository = new WidgetRepository(db);
  return repository.update(id, data);
};

const deleteWidget = (db: DatabaseSync, id: string): boolean => {
  const repository = new WidgetRepository(db);
  return repository.delete(id);
};

export {
  getAllWidgets,
  createWidget,
  updateWidget,
  deleteWidget,
};
