import db from "../database/db";
import * as firebase from "firebase";
import {Card} from "../type/Card";
import {Column} from "../type/Column";
import {Kanbanboard} from "../type/Kanbanboard";
export const getKanbanboard = async (kanbanboardId: string): Promise<Kanbanboard> => {
  const kanbanboardRef = db.collection("kanbanboards").doc(kanbanboardId);
  const kanbanboardSnapshot = await kanbanboardRef.get();

  if (!kanbanboardSnapshot.exists) {
    throw new Error("Kanbanboard is not found")
  };

  const {
    title,
    userDisplayName,
    userId
  } = kanbanboardSnapshot.data()!;

  const columnsRef = kanbanboardRef.collection("columns");

  const columnSnapshot = await columnsRef.get()
  const columnsDocs: firebase.firestore.QueryDocumentSnapshot[] = columnSnapshot.docs;
  const columns = await Promise.all(columnsDocs.map<Promise<Column>>(async columnsDoc => {
    const {
      order,
      title
    } = columnsDoc.data();
    const cardsRef = columnsDoc.ref.collection("cards");
    const cardSnapshot = await cardsRef.get();
    const cardDocs = cardSnapshot.docs;
    const cards = cardDocs.map<Card>(cardDoc => {
      const {
        checklist,
        comment,
        dueDate,
        description,
        title,
        order,
        attachments
      } = cardDoc.data();

      const card: Card = {
        checklist,
        comment,
        dueDate,
        description,
        title,
        id: cardDoc.id,
        order,
        attachments
      };
      return card
    });
    return {
      title,
      cards,
      order,
      id: columnsDoc.id
    }
  }));
  return {
    title,
    userDisplayName,
    userId,
    columns,
    id: kanbanboardSnapshot.id
  }
};