import {Column} from "../type/Column";
import db from "../database/db";

export const addColumn = async (kanbanboardId: string, columnTitle: string) => {
  const newColumn: Column = {
    title: columnTitle,
    cards: [],
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

  columns.push(newColumn);

  await kanbanboardRef.update({columns})
};