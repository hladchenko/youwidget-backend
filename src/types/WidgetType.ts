import { type Static, Type } from "@sinclair/typebox";

export const Widget = Type.Object({
  id: Type.Optional(Type.String()),
  name: Type.String(),
  description: Type.Optional(Type.String()),
  createdAt: Type.Optional(Type.String({ format: "date-time" })),
  updatedAt: Type.Optional(Type.String({ format: "date-time" })),
});

export const CreateWidgetRequest = Type.Object({
  name: Type.String(),
  description: Type.Optional(Type.String()),
});

export const UpdateWidgetRequest = Type.Object({
  name: Type.Optional(Type.String()),
  description: Type.Optional(Type.String()),
});

export type WidgetType = Static<typeof Widget>;
export type CreateWidgetRequestType = Static<typeof CreateWidgetRequest>;
export type UpdateWidgetRequestType = Static<typeof UpdateWidgetRequest>;
