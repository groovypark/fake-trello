import db from "../database/db";
import {Kanbanboard} from "../type/Kanbanboard";

export const getKanbanboard = async (kanbanboardId: string): Promise<Kanbanboard> => {
  const kanbanboardRef = db.collection("kanbanboards").doc(kanbanboardId);
  const kanbanboardSnapshot = await kanbanboardRef.get();

  if (!kanbanboardSnapshot.exists) {
    throw new Error("Kanbanboard is not found")
  }

  const {
    title,
    userDisplayName,
    userId,
    columns
  } = kanbanboardSnapshot.data()!;

  return {
    title,
    userDisplayName,
    userId,
    columns,
    id: kanbanboardSnapshot.id
  }
};