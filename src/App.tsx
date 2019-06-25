import React from 'react';
import './App.css';
import {BrowserRouter as Router, Redirect, Route, RouteComponentProps} from "react-router-dom";
import Session from "./session/Session";
import SigninPage from "./signin/SigninPage";
import SigninWithLineCallbackPage from "./signin/SigninWithLineCallbackPage";

const Index = () => {
  const user = Session.user;
  if (user === null) {
    return (
      <SigninPage/>
    )
  }
  return (
    <Redirect to={`/${user.userId}/boards`}/>
  )
};

const Boards = () => {
  return (
    <div>Boards</div>
  )
};

const App: React.FC = () => {
  return (
    <Router>
      <Route path="/signin/line" exact component={SigninWithLineCallbackPage} />
      <Route path="/" exact component={Index} />
      <Route path="/:userId/boards" component={Boards} />
    </Router>
  );
};

export default App;
