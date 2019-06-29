import {User} from "./User";
import {Check} from "./Check";
import {Attachment} from "./Attachment";
import {Comment} from "./Comment";
import * as firebase from "firebase";

export type Card = {
  title: string
  description: string
  checklist: Check[]
  comments: Comment[]
  dueDate: firebase.firestore.Timestamp
  attachments: Attachment[]
  user: User
}