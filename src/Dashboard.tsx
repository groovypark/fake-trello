import React, {useEffect, useState} from "react";
import {DashboardState, loadKanbanboardList, loadUser} from "./dashboard/reducers/dashboardReducer";
import {useDispatch, useSelector} from "react-redux";
import {getKanbanboardList} from "./dashboard/getKanbanboardList";
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
import {Link} from "react-router-dom";


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
    getKanbanboardList(userId).then(kanbanboardList => {
      dispatch(loadKanbanboardList(kanbanboardList))
    });
    getUser(userId).then(user => {
      dispatch(loadUser(user))
    });
  }, []);

  const isMasterUser = !!Session.user && Session.user.userId === userId;
  const deleteKanbanboard = (kanbanboard: Kanbanboard) => async (e: React.SyntheticEvent) => {
    e.preventDefault();
    if (!window.confirm(`${kanbanboard.title}보드를 삭제하시겠습니까?`)) {
      return;
    }
    await deleteKanbanboardFromDb(kanbanboard.id as string);
    getKanbanboardList(userId).then(kanbanboardList => {
      dispatch(loadKanbanboardList(kanbanboardList))
    })
  };

  const [isDropdownHidden, setIsDropdownHidden] = useState(true);
  const toggleDropdown = () => {
    setIsDropdownHidden(!isDropdownHidden)
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
        {!!dashboardState.user ? (
          <span>
            {!!dashboardState.user.pictureUrl ? (
              <img className="profile"
                   src={dashboardState.user.pictureUrl}
                   alt="" width={30}
                   onClick={toggleDropdown}
              />
            ) : null}
          </span>
        ) : null}
      </div>

      {isDropdownHidden ? null : (
        <div>
          {!!dashboardState.user ? (
            <div className="profile-dropdown">
              <div className="dropdown-content">{dashboardState.user.displayName}</div>
              <div className="dropdown-content signout"><span onClick={() => signOut(history)}>Sign Out</span></div>
            </div>
          ) : null}
        </div>
      )}

      <div className="board-list">
        {dashboardState.kanbanboardList.map((kanbanboard, i) => {
          return (
            <Link to={`/board/${kanbanboard.id}`} className="board-list-item" key={kanbanboard.id}>
                {isMasterUser ? (
                  <button className="delete-btn" onClick={deleteKanbanboard(kanbanboard)}>
                    x
                  </button>
                ) : null}

                <h2>{kanbanboard.title}</h2>
                <div>{kanbanboard.userDisplayName}님의 칸반보드</div>
            </Link>
          )
        })}
      </div>

      {isMasterUser ? (
        <AddKanbanboard
          userId={userId}
        />
      ) : null}
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
    getKanbanboardList(userId).then(kanbanboardList => {
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