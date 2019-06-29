import {User} from "./User";

export type Card = {
  title: string
  description: string
  checklist: string[]
  comment: string[]
  dueDate: string
  attachments: string[]
  user: User
}