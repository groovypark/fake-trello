import React, {useEffect, useState} from "react";
import {DashboardState, loadKanbanboardList, loadUser, resetDashboard} from "./reducers/dashboardReducer";
import {useDispatch, useSelector} from "react-redux";
import {getKanbanboardList} from "./getKanbanboardList";
import Session from "../session/Session";
import {KanbanboardType} from "../type/KanbanboardType";
import {addKanbanboardToDb} from "./addKanbanboardToDb";
import "./Dashboard.css"
import {RouteComponentProps} from "react-router";
import {deleteKanbanboardFromDb} from "./deleteKanbanboardFromDb";
import {getUser} from "./getUser";
import {Link} from "react-router-dom";
import Header from "../layout/Header";


const Dashboard = (props: RouteComponentProps<{userId: string}>) => {
  const {
    match,
  } = props;
  const { userId } = match.params;

  const dashboardState = useSelector<any, DashboardState>(state => state.dashboardReducer);
  const dispatch = useDispatch();

  useEffect(() => {
    getKanbanboardList(userId).then(kanbanboardList => {
      dispatch(loadKanbanboardList(kanbanboardList))
    });
    getUser(userId).then(user => {
      dispatch(loadUser(user))
    });

    return () => {
      dispatch(resetDashboard())
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const isMasterUser = !!Session.user && Session.user.userId === userId;
  const deleteKanbanboard = (kanbanboard: KanbanboardType) => async (e: React.SyntheticEvent) => {
    e.preventDefault();
    if (!window.confirm(`${kanbanboard.title}보드를 삭제하시겠습니까?`)) {
      return;
    }
    await deleteKanbanboardFromDb(kanbanboard.id as string);
    getKanbanboardList(userId).then(kanbanboardList => {
      dispatch(loadKanbanboardList(kanbanboardList))
    })
  };

  return (
    <div>
      <Header/>
      {!!dashboardState.user ? (
        <div className="user-name">
          <img
            src="data:image/png;base64,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"
            alt="user icon"
            width="25px"
          />
          {dashboardState.user.displayName}님의 대시보드
        </div>
      ) : null}

      <div className="board-list">
        {dashboardState.kanbanboardList.map((kanbanboard, i) => {
          return (
            <Link to={`/board/${kanbanboard.id}`} className="board-list-item" key={kanbanboard.id}>
                {isMasterUser ? (
                  <span className="delete-btn" onClick={deleteKanbanboard(kanbanboard)}>
                    x
                  </span>
                ) : null}

                <div className="board-title">{kanbanboard.title}</div>
                <div className="board-user">{kanbanboard.user.displayName}</div>
            </Link>
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
  const handleCreateBoard = async () => {
    if (!window.confirm("칸반보드를 추가하시겠습니까?")) {
      return
    }
    const user = Session.user;
    if (user === null) {
      throw new Error("user should not be null");
    }
    if (title.trim().length === 0) {
      return
    }
    const newKanbanboard: KanbanboardType = {
      title,
      columns: [],
      user
    };
    setTitle("");
    await addKanbanboardToDb(newKanbanboard);
    getKanbanboardList(userId).then(kanbanboardList => {
      dispatch(loadKanbanboardList(kanbanboardList))
    });
    alert("Kanbanboard가 추가되었습니다.");

    handleEditing()
  };

  const [title, setTitle] = useState("");
  const [editing, setEditing] = useState(false);
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value)
  };

  const handleKeyPress = async (e: React.KeyboardEvent) => {

    if (e.key === "Enter") {
      e.preventDefault();
      await handleCreateBoard();
    }
  };

  const handleEditing = () => {
    setEditing(!editing)
  };

  if (!editing)
  return (
    <div className="board-list-item board-new" onClick={handleEditing}>
      Create new board
    </div>
  );

  return (
    <div className="board-list-item">
      <span className="delete-btn" onClick={handleEditing}>
        x
      </span>
      <div className="board-title">
        <input
          autoFocus={true}
          className="board-input"
          type="text"
          id="title"
          value={title}
          onChange={handleChange}
          onKeyPress={handleKeyPress}
          placeholder="Add board title"
        />
      </div>
      <div className="board-user" onClick={handleCreateBoard}><b>Create</b></div>
    </div>
  )
};

export default Dashboard