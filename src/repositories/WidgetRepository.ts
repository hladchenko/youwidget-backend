import type { DatabaseSync } from "node:sqlite";
import type {
  WidgetType,
  CreateWidgetRequestType,
  UpdateWidgetRequestType,
} from "../types/WidgetType.js";
import type { IWidgetRepository } from "./interfaces/IWidgetRepository.js";

export class WidgetRepository implements IWidgetRepository {
  constructor(private db: DatabaseSync) {}

  findAll(): WidgetType[] {
    const stmt = this.db.prepare(
      "SELECT * FROM widgets ORDER BY created_at DESC",
    );
    const rows = stmt.all() as any[];

    return rows.map((row) => {
      const widget: WidgetType = {
        id: row.id.toString(),
        title: row.title,
        createdAt: row.created_at,
        updatedAt: row.updated_at,
      };
      if (row.description !== null) {
        widget.description = row.description;
      }
      if (row.json_data !== null) {
        widget.json_data = row.json_data;
      }
      if (row.type !== null) {
        widget.type = row.type;
      }
      return widget;
    });
  }

  findById(id: string): WidgetType | null {
    const stmt = this.db.prepare("SELECT * FROM widgets WHERE id = ?");
    const row = stmt.get(id) as any;

    if (!row) {
      return null;
    }

    const widget: WidgetType = {
      id: row.id.toString(),
      title: row.title,
      createdAt: row.created_at,
      updatedAt: row.updated_at,
    };
    if (row.description !== null) {
      widget.description = row.description;
    }
    if (row.json_data !== null) {
      widget.json_data = row.json_data;
    }
    if (row.type !== null) {
      widget.type = row.type;
    }
    return widget;
  }

  create(data: CreateWidgetRequestType): WidgetType {
    const now = new Date().toISOString();
    const stmt = this.db.prepare(`
      INSERT INTO widgets (title, description, json_data, type, created_at, updated_at)
      VALUES (?, ?, ?, ?, ?, ?)
    `);

    const result = stmt.run(
      data.title,
      data.description || null,
      data.json_data || null,
      data.type || "text",
      now,
      now,
    );

    const widget: WidgetType = {
      id: result.lastInsertRowid.toString(),
      title: data.title,
      createdAt: now,
      updatedAt: now,
    };
    if (data.description) {
      widget.description = data.description;
    }
    if (data.json_data) {
      widget.json_data = data.json_data;
    }
    if (data.type) {
      widget.type = data.type;
    }
    return widget;
  }

  update(id: string, data: UpdateWidgetRequestType): WidgetType | null {
    const existing = this.findById(id);
    if (!existing) {
      return null;
    }

    const now = new Date().toISOString();
    const title = data.title ?? existing.title;
    const description =
      data.description !== undefined ? data.description : existing.description;

    const stmt = this.db.prepare(`
      UPDATE widgets
      SET title = ?, description = ?, updated_at = ?
      WHERE id = ?
    `);

    stmt.run(title, description || null, now, id);

    const result: WidgetType = {
      id,
      title,
      updatedAt: now,
    };

    if (existing.createdAt) {
      result.createdAt = existing.createdAt;
    }

    if (description !== null && description !== undefined) {
      result.description = description;
    }

    return result;
  }

  delete(id: string): boolean {
    const stmt = this.db.prepare("DELETE FROM widgets WHERE id = ?");
    const result = stmt.run(id);

    return result.changes > 0;
  }
}
