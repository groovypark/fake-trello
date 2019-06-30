import {UserType} from "./UserType";
import {CheckType} from "./CheckType";
import {AttachmentType} from "./AttachmentType";
import {CommentType} from "./CommentType";
import * as firebase from "firebase";

export type CardType = {
  title: string
  description: string
  checklist: CheckType[]
  comments: CommentType[]
  dueDate: firebase.firestore.Timestamp
  attachments: AttachmentType[]
  user: UserType
}