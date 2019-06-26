import {Column} from "./Column";

export type Kanbanboard = {
  title: string,
  columns: Column[],
  userId: string,
  userDisplayName: string,
  id?: string
}