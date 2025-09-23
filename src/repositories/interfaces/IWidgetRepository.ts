import type {
  WidgetType,
  CreateWidgetRequestType,
  UpdateWidgetRequestType,
} from "../../types/WidgetType.js";
import type { IBaseRepository } from "./IBaseRepository.js";

export interface IWidgetRepository
  extends IBaseRepository<
    WidgetType,
    CreateWidgetRequestType,
    UpdateWidgetRequestType
  > {}
