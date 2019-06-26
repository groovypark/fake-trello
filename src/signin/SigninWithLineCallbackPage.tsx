import {RouteComponentProps} from "react-router";
import React from "react";
import URI from "urijs";
import {lineConfig} from "../config/line-config";
import {getUserFromCode} from "./singin";
import Session from "../session/Session";

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
      history.push("/")
    })

  }, []);
  return (
    null
  )
};

export default SigninWithLineCallbackPage;