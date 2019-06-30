import { KanbanboardType } from '../type/KanbanboardType'
import db from '../database/db';

export const addKanbanboardToDb = async (kanbanboard: KanbanboardType) => {
  const kanbanboardRef = db.collection("kanbanboards");
  await kanbanboardRef.add(kanbanboard);
};