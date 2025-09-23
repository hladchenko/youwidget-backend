import { type Static, Type } from "@sinclair/typebox";

export const Widget = Type.Object({
  id: Type.Optional(Type.String()),
  name: Type.String(),
  description: Type.Optional(Type.String()),
  type: Type.Optional(
    Type.Union([
      Type.Literal("line-chart"),
      Type.Literal("bar-chart"),
      Type.Literal("text"),
    ]),
  ),
  createdAt: Type.Optional(Type.String({ format: "date-time" })),
  updatedAt: Type.Optional(Type.String({ format: "date-time" })),
});

export const CreateWidgetRequest = Type.Object({
  name: Type.String(),
  description: Type.Optional(Type.String()),
  type: Type.Optional(
    Type.Union([
      Type.Literal("line-chart"),
      Type.Literal("bar-chart"),
      Type.Literal("text"),
    ]),
  ),
});

export const UpdateWidgetRequest = Type.Object({
  name: Type.Optional(Type.String()),
  description: Type.Optional(Type.String()),
});

export type WidgetType = Static<typeof Widget>;
export type CreateWidgetRequestType = Static<typeof CreateWidgetRequest>;
export type UpdateWidgetRequestType = Static<typeof UpdateWidgetRequest>;
