import db from "../database/db";
import {KanbanboardType} from "../type/KanbanboardType";

export type UnsubscribeFn = () => void;

export const subscribeKanbanboard = (
  kanbanboardId: string,
  onKanbanboard: (kanbanboard: KanbanboardType) => void
): UnsubscribeFn => {
  const kanbanboardRef = db.collection("kanbanboards").doc(kanbanboardId);

  const unsubscribe: UnsubscribeFn = kanbanboardRef.onSnapshot(snapshot => {

    if (!snapshot.exists) {
      return // FIXME
    }

    const docData = snapshot.data();
    if (!docData) {
      return
    }

    const {
      title,
      user,
      columns
    } = docData;

    const kanbanboard: KanbanboardType = {
      title,
      user,
      columns,
      id: kanbanboardId
    };

    console.log(kanbanboard)
    onKanbanboard(kanbanboard);
  });

  return unsubscribe;
};