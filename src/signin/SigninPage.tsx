import React from "react";
import {signinWithLine} from "./singin";
import logo from "../fake-trello-logo.png";
import "./SigninPage.css"

const SigninPage = () => {
  return (
    <div className="SigninPage">
      <div className="navbar">
        <img className="logo" src={logo} alt="fake-trello-logo"/>
        <button className="signin-btn" onClick={signinWithLine}>Sign In</button>
      </div>

      <div className="center">
        <h1>Thanks for using Fake Trello.</h1>
        <p>You’re all logged out. So now what?</p>
      </div>
    </div>
  )
};



export default SigninPage