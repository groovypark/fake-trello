import {Card} from "../type/Card";
import db from "../database/db";

export const addCard = async (kanbanboardId: string, columnIndex: number, title: string) => {
  const card: Card = {
    title: title,
    description: "",
    checklist: [],
    comment: [],
    dueDate: "", // FIXME
    attachments: []
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