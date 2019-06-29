import React, {useEffect, useState} from "react";
import "./KanbanboardComp.css"
import {subscribeKanbanboard, UnsubscribeFn} from "./kanbanboard/subscribeKanbanboard";
import {RouteComponentProps} from "react-router";
import Header from "./Header";
import {useDispatch, useSelector} from "react-redux";
import {KanbanboardState, loadKanbanbaord, resetKanbanboard} from "./kanbanboard/kanbanboardReducer";
import {addCard} from "./kanbanboard/addCard";
import {Kanbanboard} from "./type/Kanbanboard";
import {addColumn} from "./kanbanboard/addColumn";

const KanbanboardComp = (props: RouteComponentProps<{kanbanboardId: string}>) => {
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
          <div className="column" key={columnIndex}>
            <h2>{column.title}</h2>
            {column.cards.map((card, i) => {
              return (
                <div className="card" key={i}>
                  <h3>{card.title}</h3>
                  {card.description}
                  {card.comment.map((comment, i) => {
                    return (
                      <div key={i}>
                        {comment}
                      </div>
                    )
                  })}
                </div>
              )
            })}
            <AddNewCard kanbanboardId={kanbanboardId} columnIndex={columnIndex} />
          </div>
        )
      })}

      <AddNewColumn kanbanboardId={kanbanboardId}/>
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
    <div className="column">
      <input placeholder="Enter a title" onChange={handleChange} value={columnTitle}/>
      <button onClick={handleClick}>add list</button>
    </div>
  )
};

const AddNewCard: React.FC<{kanbanboardId: string, columnIndex: number}>
  = (props) => {
  const {
    kanbanboardId,
    columnIndex
  } = props;
  const [cardTitle, setCardTitle] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCardTitle(e.target.value)
  };

  const handleClick = () => {
    addCard(kanbanboardId, columnIndex, cardTitle);
    setCardTitle("")
  };

  return (
    <div>
      <input placeholder="Enter a title" onChange={handleChange} value={cardTitle}/>
      <button onClick={handleClick}>add card</button>
    </div>
  )
}


export default KanbanboardComp