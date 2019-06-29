import { Kanbanboard } from '../type/Kanbanboard'
import db from '../database/db';

export const getKanbanboardList = async (userId: string): Promise<Kanbanboard[]> => {
  const kanbanboardRef = db.collection("kanbanboards").where("user.userId", "==", userId);
  const querySnapshot = await kanbanboardRef.get();
  const { docs } = querySnapshot;
  return docs.map(doc => {
    return {...doc.data(), id: doc.id};
  }) as Kanbanboard[];
};