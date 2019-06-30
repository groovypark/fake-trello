import * as H from "history";
import Session from "../session/Session";

export const signOut = (history: H.History) => {
  if (!window.confirm("로그아웃 하시겠습니까?")) {
    return;
  }
  Session.removeUser();
  history.push("/");
};