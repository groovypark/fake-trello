import {Card} from "../type/Card";
import db from "../database/db";
import Session from "../session/Session";
import * as firebase from "firebase";

export const addCard = async (kanbanboardId: string, columnIndex: number, title: string) => {
  const user = Session.user;

  if (user === null) {
    throw new Error("Session.user should not be null")
  }
  const card: Card = {
    title: title,
    description: "",
    checklist: [],
    comments: [],
    dueDate: firebase.firestore.Timestamp.now(),
    attachments: [],
    user: user
  };

  const kanbanboardRef = db.collection("kanbanboards").doc(kanbanboardId);
  const kanbanboardSnapshot = await kanbanboardRef.get();
  if (!kanbanboardSnapshot.exists) {
    throw new Error("kanbanboardSnapshot doesn't exist")
  }
  const kanbanboardData = kanbanboardSnapshot.data();
  if (!kanbanboardData) {
    return;
  }

  const {
    columns
  } = kanbanboardData;

  columns[columnIndex].cards.push(card);

  await kanbanboardRef.update({columns})
};