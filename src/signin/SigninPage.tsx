import {RouteComponentProps} from "react-router";
import {signinWithLine} from "./singin";
import React from "react";

const SigninPage = () => {
  return (
    <div>
      <h1>Signin</h1>
      <button onClick={signinWithLine}>Line</button>
    </div>
  )
};

export default SigninPage