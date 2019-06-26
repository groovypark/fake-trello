import * as firebase from "firebase";
import "firebase/database";
import {firebaseConfig} from "../config/firebase-config";

const app = firebase.initializeApp(firebaseConfig);
export default firebase.firestore(app);


