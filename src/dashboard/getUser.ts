import db from "../database/db";
import {UserType} from "../type/UserType";

export const getUser = async (userId: string): Promise<UserType> => {
  const documentSnapshot = await db.collection("users").doc(userId).get();
  const data = documentSnapshot.data();

  return {
    ...data,
    userId: documentSnapshot.id
  } as UserType
};