import React, {useEffect, useState} from "react";
import {DashboardState, loadKanbanboardList, loadUser} from "./dashboard/reducers/dashboardReducer";
import {useDispatch, useSelector} from "react-redux";
import {getKanbanboards} from "./dashboard/getKanbanboards";
import Session from "./session/Session";
import {Kanbanboard} from "./type/Kanbanboard";
import {addKanbanboardToDb} from "./dashboard/addKanbanboardToDb";
import "./Dashboard.css"
import logoGray from "./fake-trello-logo-gray.png";
import logoWhite from "./fake-trello-logo-white.png";
import {signOut} from "./signin/signout";
import {RouteComponentProps} from "react-router";
import {deleteKanbanboardFromDb} from "./dashboard/deleteKanbanboardFromDb";
import {getUser} from "./dashboard/getUser";


const Dashboard = (props: RouteComponentProps<{userId: string}>) => {
  const {
    history,
    match
  } = props;
  const {
    userId
  } = match.params;

  const dashboardState = useSelector<any, DashboardState>(state => state.dashboardReducer);
  const dispatch = useDispatch();

  useEffect(() => {
    getKanbanboards(userId).then(kanbanboardList => {
      dispatch(loadKanbanboardList(kanbanboardList))
    });
    getUser(userId).then(user => {
      dispatch(loadUser(user))
    });
  }, []);

  const isMasterUser = !!Session.user && Session.user.userId === userId;
  const deleteKanbanboard = (kanbanboard: Kanbanboard) => async () => {
    if (!window.confirm(`${kanbanboard.title}보드를 삭제하시겠습니까?`)) {
      return;
    }
    await deleteKanbanboardFromDb(kanbanboard.id as string);
    getKanbanboards(userId).then(kanbanboardList => {
      dispatch(loadKanbanboardList(kanbanboardList))
    })
  };
  return (
    <div>
      <div className="header">
        <a><img className="logo"
             src={logoGray}
             onMouseOver={e => (e.currentTarget.src = logoWhite)}
             onMouseOut={e => (e.currentTarget.src = logoGray)}
             alt="fake-trello-logo"
        /></a>
        <button className="signout-btn" onClick={() => signOut(history)}>Sign Out</button>
      </div>

      <h1>Dashboard</h1>
      {!!dashboardState.user ? (
        <div>
          {!!dashboardState.user.pictureUrl ? (
            <div>
              <img src={dashboardState.user.pictureUrl} alt="" width={100}/>
            </div>
          ) : null}
          <h1>{dashboardState.user.displayName}님의 대시보드</h1>
        </div>
      ) : null}
      <div>
        {dashboardState.kanbanboardList.map((kanbanboard, i) => {
          return (
            <div className="board-list" key={kanbanboard.id}>
              <div className="board-list-item" key={i}>
                {i} {kanbanboard.userDisplayName}님의 칸반보드: {kanbanboard.title}
                {isMasterUser ? (
                  <button onClick={deleteKanbanboard(kanbanboard)}>
                    Delete
                  </button>
                ) : null}
              </div>
            </div>
          )
        })}
        {isMasterUser ? (
          <AddKanbanboard
            userId={userId}
          />
        ) : null}
      </div>

    </div>
  )
};

const AddKanbanboard: React.FC<{ userId: string }> = (props) => {
  const {
    userId
  } = props;

  const dispatch = useDispatch();
  const handleClick = async () => {
    if (!window.confirm("칸반보드를 추가하시겠습니까?")) {
      return
    }
    const user = Session.user;
    if (user === null) {
      throw new Error("user should not be null");
    }
    if (title.trim().length == 0) {
      return
    }
    const newKanbanboard: Kanbanboard = {
      title,
      columns: [],
      userId: user.userId,
      userDisplayName: user.displayName
    };
    setTitle("");
    await addKanbanboardToDb(newKanbanboard);
    getKanbanboards(userId).then(kanbanboardList => {
      dispatch(loadKanbanboardList(kanbanboardList))
    });
    alert("Kanbanboard가 추가되었습니다.");
  };

  const [title, setTitle] = useState("");
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value)
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {

    if (e.key == "Enter") {
      e.preventDefault();
      handleClick();
    }
  };

  return (
    <div>
      <h2>Kanbanboard 추가</h2>
      <label htmlFor="title">제목</label>
      <input
        type="text"
        id="title"
        value={title}
        onChange={handleChange}
        onKeyPress={handleKeyPress}
      />
      <button onClick={handleClick}>Add</button>
    </div>
  )
};

export default Dashboard