import React from 'react';
import './App.css';
import {BrowserRouter as Router, Redirect, Route, Switch} from "react-router-dom";
import Session from "./session/Session";
import SigninPage from "./signin/SigninPage";
import SigninWithLineCallbackPage from "./signin/SigninWithLineCallbackPage";
import Dashboard from "./dashboard/Dashboard";
import KanbanboardComp from "./kanbanboard/KanbanboardComp";
import CardDetail from "./kanbanboard/card/CardDetail";

const Index = () => {
  const user = Session.user;
  if (user === null) {
    return (
      <SigninPage/>
    )
  }
  return (
    <Redirect to={`/users/${user.userId}/dashboard`}/>
  )
};

const NotFound = () => {
  return (
    <h1>404</h1>
  )
};

const App: React.FC = () => {
  return (
    <Router>
      <Switch>
        <Route path="/signin/line" exact component={SigninWithLineCallbackPage} />
        <Route path="/" exact component={Index} />
        <Route path="/users/:userId/dashboard" component={Dashboard} />
        <Route path="/board/:kanbanboardId" exact component={KanbanboardComp} />
        <Route path="/board/:kanbanboardId/:columnIndex/:cardIndex" component={CardDetail} />
        <Route component={NotFound}/>
      </Switch>
    </Router>
  );
};

export default App;
