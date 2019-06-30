import * as firebase from "firebase";

export const uploadFileToStorage = async (file: File): Promise<string> => {
  const storageRef = firebase.storage().ref().child(`attachment/${new Date().getTime()}`);
  // storage.
  await storageRef.put(file);
  const url = await storageRef.getDownloadURL();
  return url
};