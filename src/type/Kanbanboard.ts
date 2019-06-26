import {Column} from "./Column";
import { User } from './User'

export type Kanbanboard = {
  columns: Column[],
  user: User
}