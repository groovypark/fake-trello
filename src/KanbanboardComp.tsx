import React, {useEffect, useState} from "react";
import "./KanbanboardComp.css"
import {getKanbanboard} from "./kanbanboard/getKanbanboard";
import {RouteComponentProps} from "react-router";
import {Kanbanboard} from "./type/Kanbanboard";

const KanbanboardComp = (props: RouteComponentProps<{kanbanboardId: string}>) => {

  const {
    history
  } = props;
  const {
    kanbanboardId,
  } = props.match.params;

  useEffect(() => {
    getKanbanboard(kanbanboardId).then(kanbanboard => {
      console.log(kanbanboard)
      setKanbanboard(kanbanboard)
    }).catch(e => {

      history.push("/")
    })
  }, []);

  const [kanbanboard, setKanbanboard] = useState<Kanbanboard | null>(null);

  if (!kanbanboard) {
    return (<div>Loading...</div>)
  }

  return (
    <div className="board">
      <h1>{kanbanboard.title}</h1>
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


            <input/>
            <button>add card</button>
          </div>
        )
      })}

      <div className="column">
        <input/>
        <button>add list</button>
      </div>
    </div>
  )
};



export default KanbanboardComp