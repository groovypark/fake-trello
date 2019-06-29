import {Column} from "./Column";
import {User} from "./User";

export type Kanbanboard = {
  title: string,
  columns: Column[],
  user: User,
  id?: string
}