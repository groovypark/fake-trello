import { KanbanboardType } from '../type/KanbanboardType'
import db from '../database/db';

export const getKanbanboardList = async (userId: string): Promise<KanbanboardType[]> => {
  const kanbanboardRef = db.collection("kanbanboards").where("user.userId", "==", userId);
  const querySnapshot = await kanbanboardRef.get();
  const { docs } = querySnapshot;
  return docs.map(doc => {
    return {...doc.data(), id: doc.id};
  }) as KanbanboardType[];
};