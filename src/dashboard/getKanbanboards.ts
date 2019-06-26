import { Kanbanboard } from '../type/Kanbanboard'
import db from '../database/db';

export const getKanbanboards = async (userId: string): Promise<Kanbanboard[]> => {
  const kanbanboardRef = db.collection("kanbanboards").where("userId", "==", userId);
  const querySnapshot = await kanbanboardRef.get();
  const { docs } = querySnapshot;
  return docs.map(doc => {
    return {...doc.data(), id: doc.id};
  }) as Kanbanboard[];
};