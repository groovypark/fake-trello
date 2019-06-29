import {User} from "./User";
import {Check} from "./Check";
import {Attachment} from "./Attachment";
import {Comment} from "./Comment";

export type Card = {
  title: string
  description: string
  checklist: Check[]
  comments: Comment[]
  dueDate: string
  attachments: Attachment[]
  user: User
}