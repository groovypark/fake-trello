import {ColumnType} from "./ColumnType";
import {UserType} from "./UserType";

export type KanbanboardType = {
  title: string,
  columns: ColumnType[],
  user: UserType,
  id?: string
}