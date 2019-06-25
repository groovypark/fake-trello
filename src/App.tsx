import React from 'react';
import './App.css';
import URI from "urijs";
import {signinWithLine, getUserFromCode} from "./signin/singin";
import {BrowserRouter as Router, Route, RouteComponentProps, Link, Redirect} from "react-router-dom";
import Session from "./session/Session";

const Signin = (props: RouteComponentProps) => {
  return (
    <div>
      <h1>Signin</h1>
      <button onClick={signinWithLine}>Line</button>
    </div>
  )
}

const SigninWithLineCallback = (props: RouteComponentProps) => {
  React.useEffect(() => {
    const {
      history,
      location
    } = props;
    const {code, state} = (URI(location.search).query(true) as any);

    if (state !== "LINEISTHEBEST") {
      throw new Error("state should be LINEISTHEBEST")
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

const Index = (props: RouteComponentProps) => {
  const user = Session.user;

  const signOut = () => {
    Session.removeUser();
    const {
      history
    } = props;
    history.push("/signin");
  };

  if (user !== null) {
    return (
      <div>
        {user.displayName} {user.userId} 환영합니다.🤪
        <button onClick={signOut}>SignOut</button>
      </div>
    )
  }

  return (
    <Redirect to="/signin"/>
  )
};

const App: React.FC = () => {
  return (
    <Router>
      <Route path="/signin" exact component={Signin} />
      <Route path="/signin/line" exact component={SigninWithLineCallback} />
      <Route path="/" exact component={Index} />
    </Router>
  );
};

export default App;
