import { Kanbanboard } from '../type/Kanbanboard'
import db from '../database/db';

export const addKanbanboardToDb = async (kanbanboard: Kanbanboard) => {
  const kanbanboardRef = db.collection("kanbanboards");
  const docRef = await kanbanboardRef.add(kanbanboard);
}