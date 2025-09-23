import type { DatabaseSync } from "node:sqlite";
import type {
  WidgetType,
  CreateWidgetRequestType,
  UpdateWidgetRequestType,
} from "../types/WidgetType.js";

const getAllWidgets = (db: DatabaseSync): WidgetType[] => {
  const stmt = db.prepare("SELECT * FROM widgets ORDER BY created_at DESC");
  const rows = stmt.all() as any[];

  return rows.map((row) => {
    const widget: WidgetType = {
      id: row.id.toString(),
      name: row.name,
      createdAt: row.created_at,
      updatedAt: row.updated_at,
    };
    if (row.description !== null) {
      widget.description = row.description;
    }
    return widget;
  });
};

const getWidgetById = (db: DatabaseSync, id: string): WidgetType | null => {
  const stmt = db.prepare("SELECT * FROM widgets WHERE id = ?");
  const row = stmt.get(id) as any;

  if (!row) {
    return null;
  }

  const widget: WidgetType = {
    id: row.id.toString(),
    name: row.name,
    createdAt: row.created_at,
    updatedAt: row.updated_at,
  };
  if (row.description !== null) {
    widget.description = row.description;
  }
  return widget;
};

const createWidget = (
  db: DatabaseSync,
  data: CreateWidgetRequestType,
): WidgetType => {
  const now = new Date().toISOString();
  const stmt = db.prepare(`
    INSERT INTO widgets (name, description, created_at, updated_at)
    VALUES (?, ?, ?, ?)
  `);

  const result = stmt.run(data.name, data.description || null, now, now);

  const widget: WidgetType = {
    id: result.lastInsertRowid.toString(),
    name: data.name,
    createdAt: now,
    updatedAt: now,
  };
  if (data.description) {
    widget.description = data.description;
  }
  return widget;
};

const updateWidget = (
  db: DatabaseSync,
  id: string,
  data: UpdateWidgetRequestType,
): WidgetType | null => {
  // First check if widget exists
  const existing = getWidgetById(db, id);
  if (!existing) {
    return null;
  }

  const now = new Date().toISOString();
  const name = data.name ?? existing.name;
  const description =
    data.description !== undefined ? data.description : existing.description;

  const stmt = db.prepare(`
    UPDATE widgets
    SET name = ?, description = ?, updated_at = ?
    WHERE id = ?
  `);

  stmt.run(name, description || null, now, id);

  const result: WidgetType = {
    id,
    name,
    updatedAt: now,
  };

  if (existing.createdAt) {
    result.createdAt = existing.createdAt;
  }

  if (description !== null && description !== undefined) {
    result.description = description;
  }

  return result;
};

const deleteWidget = (db: DatabaseSync, id: string): boolean => {
  const stmt = db.prepare("DELETE FROM widgets WHERE id = ?");
  const result = stmt.run(id);

  return result.changes > 0;
};

export {
  getAllWidgets,
  getWidgetById,
  createWidget,
  updateWidget,
  deleteWidget,
};
