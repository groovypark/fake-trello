import React, {useEffect} from 'react';
import './App.css';
import { BrowserRouter as Router, Redirect, Route } from "react-router-dom";
import Session from "./session/Session";
import SigninPage from "./signin/SigninPage";
import SigninWithLineCallbackPage from "./signin/SigninWithLineCallbackPage";
import { addKanbanboardToDb } from "./dashboard/addKanbanboardToDb";
import { Kanbanboard } from "./type/Kanbanboard";
import { getKanbanboards } from "./dashboard/getKanbanboards";
import { addKanbanboard, DashboardState } from "./dashboard/reducers/dashboardReducer";
import {useDispatch, useSelector} from "react-redux";

const Index = () => {
  const user = Session.user;
  if (user === null) {
    return (
      <SigninPage/>
    )
  }
  return (
    <Redirect to={`/${user.userId}/dashboard`}/>
  )
};

const Dashboard = () => {
  const dashboardState = useSelector<any, DashboardState>(state => state.dashboardReducer)
  const dispatch = useDispatch();
  useEffect(() => {
    getKanbanboards().then(kanbanboards => {
      kanbanboards.forEach(kanbanboard => {
        const addKanbanboardAction = addKanbanboard(kanbanboard);
        dispatch(addKanbanboardAction);
      })
    })
  }, [])
  const handleAddKanbanboard = async () => {
    const user = Session.user;
    if (user === null) {
      throw new Error("user should not be null");
    }
    const newKanbanboard: Kanbanboard = {
      columns: [],
      user
    }
    await addKanbanboardToDb(newKanbanboard);
    alert("Kanbanboard가 추가되었습니다.");
    window.location.reload(); //FIXME
  }
  return (
    <div>
      <h1>Dashboard</h1>
      <div>
        {dashboardState.kanbanboards.map((kanbanboard, i) => {
          return (
            <div key={i}>
              {i} {kanbanboard.user.displayName}님의 칸반보드
            </div>
          )
        })}
        <h2>Kanbanboard 추가</h2>
        <button onClick={handleAddKanbanboard}>Click</button>
      </div>

    </div>
  )
};

const App: React.FC = () => {
  return (
    <Router>
      <Route path="/signin/line" exact component={SigninWithLineCallbackPage} />
      <Route path="/" exact component={Index} />
      <Route path="/:userId/dashboard" component={Dashboard} />
    </Router>
  );
};

export default App;
