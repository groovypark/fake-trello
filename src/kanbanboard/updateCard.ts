import {Card} from "../type/Card";
import db from "../database/db";

export const updateCard = async (kanbanboardId: string, columnIndex: number, cardIndex: number, card: Card) => {

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

  columns[columnIndex].cards[cardIndex] = card;

  await kanbanboardRef.update({columns})
};