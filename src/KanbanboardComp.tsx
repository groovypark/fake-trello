import React, {useEffect} from "react";
import "./KanbanboardComp.css"
import {subscribeKanbanboard, UnsubscribeFn} from "./kanbanboard/subscribeKanbanboard";
import {RouteComponentProps} from "react-router";
import Header from "./Header";
import {useDispatch, useSelector} from "react-redux";
import {KanbanboardState, loadKanbanbaord, resetKanbanboard} from "./kanbanboard/kanbanboardReducer";

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
      {kanbanboard.columns.map((column, i) => {
        return (
          <div className="column" key={i}>
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
            <input placeholder="Enter a title"/>
            <button>add card</button>
          </div>
        )
      })}

      <div className="column">
        <input placeholder="Enter a title"/>
        <button>add list</button>
      </div>
    </div>
  )
};



export default KanbanboardComp