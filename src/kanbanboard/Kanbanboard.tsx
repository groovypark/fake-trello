import React, {useEffect, useState} from "react";
import "./Kanbanboard.css"
import {subscribeKanbanboard, UnsubscribeFn} from "./subscribeKanbanboard";
import {RouteComponentProps} from "react-router";
import Header from "../layout/Header";
import {useDispatch, useSelector} from "react-redux";
import {KanbanboardState, loadKanbanbaord, resetKanbanboard} from "./kanbanboardReducer";
import {addColumn} from "./addColumn";
import Session from "../session/Session";
import KanbanboardColumn from "./KanbanboardColumn";

const Kanbanboard = (props: RouteComponentProps<{kanbanboardId: string}>) => {
  const {
    kanbanboardId,
  } = props.match.params;

  const dispatch = useDispatch();

  useEffect(() => {
    const unsubscribe: UnsubscribeFn = subscribeKanbanboard(kanbanboardId, (kanbanboard) => {
      dispatch(loadKanbanbaord(kanbanboard))
    });

    return () => {
      unsubscribe();
      dispatch(resetKanbanboard())
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const kanbanboardState = useSelector<any, KanbanboardState>(state => state.kanbanboardReducer);

  const {
    kanbanboard
  } = kanbanboardState;


  if (!kanbanboard) {
    return (<div>Loading...</div>)
  }

  return (
    <div className="kanbanboard">
      <Header/>
      <div className="kanbanboard-title">{kanbanboard.title}</div>
      {kanbanboard.columns.map((column, columnIndex) => {
        return (
          <KanbanboardColumn kanbanboardId={kanbanboardId} columnIndex={columnIndex} column={column}/>
        )
      })}
      {
        !!Session.user ? (
          <AddNewColumn kanbanboardId={kanbanboardId}/>
        ) : null
      }
    </div>
  )
};


const AddNewColumn: React.FC<{kanbanboardId: string}> = (props) => {
  const {
    kanbanboardId
  } = props;

  const [columnTitle, setColumnTitle] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      setColumnTitle(e.target.value)
  };
  const handleClick = () => {
    addColumn(kanbanboardId, columnTitle);
    setColumnTitle("")
  };

  return (
    <div className="add-list">
      <input
        className="column-input"
        placeholder="Add another list"
        onChange={handleChange}
        value={columnTitle}
      />
      <span className="add-list-btn" onClick={handleClick}>
        +
      </span>
    </div>
  )
};


export default Kanbanboard