import { Kanbanboard } from '../type/Kanbanboard'
import db from '../database/db';

export const getKanbanboards = async (): Promise<Kanbanboard[]> => {
  const kanbanboardRef = db.collection("kanbanboards");
  const querySnapshot = await kanbanboardRef.get();
  const { docs } = querySnapshot;
  return docs.map(doc => doc.data()) as Kanbanboard[];
}