import db from "../database/db";
import {ColumnType} from "../type/ColumnType";

export const updateColumn = async (kanbanboardId: string, columnIndex: number, column: ColumnType) => {

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

  columns[columnIndex] = column;

  await kanbanboardRef.update({columns})
};