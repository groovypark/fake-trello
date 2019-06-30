import db from "../database/db";

export const deleteKanbanboardFromDb = async (kanbanboardId: string) => {
  await db.collection("kanbanboards").doc(kanbanboardId).delete()
};