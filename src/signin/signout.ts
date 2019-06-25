import * as H from "history";
import Session from "../session/Session";

export const signOut = (history: H.History) => {
  Session.removeUser();
  history.push("/signin");
};