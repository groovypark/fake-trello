import {RouteComponentProps} from "react-router";
import React from "react";
import URI from "urijs";
import {lineConfig} from "../config/line-config";
import {getUserFromCode} from "./singin";
import Session from "../session/Session";
import db from "../database/db";

const SigninWithLineCallbackPage = (props: RouteComponentProps) => {
  React.useEffect(() => {
    const {
      history,
      location
    } = props;
    const {code, state} = (URI(location.search).query(true) as any);

    if (state !== lineConfig.lineStateCode) {
      throw new Error(`state should be ${lineConfig.lineStateCode}`)
    }

    getUserFromCode(code).then(user => {
      Session.setUser(user);
      db.collection("users").doc(user.userId).set({
        displayName: user.displayName,
        pictureUrl: user.pictureUrl || null,
        from: "line"
      });
      history.push("/")
    })

  }, []);
  return (
    null
  )
};

export default SigninWithLineCallbackPage;