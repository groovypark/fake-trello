import db from "../database/db";
import {User} from "../type/User";

export const getUser = async (userId: string): Promise<User> => {
  const documentSnapshot = await db.collection("users").doc(userId).get();
  const data = documentSnapshot.data();

  return {
    ...data,
    userId: documentSnapshot.id
  } as User
};