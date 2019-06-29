import db from "../database/db";
import {Kanbanboard} from "../type/Kanbanboard";

export type UnsubscribeFn = () => void;

export const subscribeKanbanboard = (
  kanbanboardId: string,
  onKanbanboard: (kanbanboard: Kanbanboard) => void
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
      userDisplayName,
      userId,
      columns
    } = docData;

    const kanbanboard: Kanbanboard = {
      title,
      userDisplayName,
      userId,
      columns,
      id: kanbanboardId
    };

    onKanbanboard(kanbanboard);
  });

  return unsubscribe;
};