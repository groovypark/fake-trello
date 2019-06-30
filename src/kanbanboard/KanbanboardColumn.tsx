import React, {useState} from 'react';
import {Link} from "react-router-dom";
import KanbanboardCard from "./KanbanboardCard";
import Session from "../session/Session";
import {ColumnType} from "../type/ColumnType";
import {updateColumn} from "./updateColumn";
import {addCard} from "./addCard";

export const KanbanboardColumn: React.FC<{ kanbanboardId: string; columnIndex: number; column: ColumnType; }>
  = (props) => {
  const {
    kanbanboardId,
    columnIndex,
    column
  } = props;

  const handleSave = (column: ColumnType) => {
    updateColumn(kanbanboardId, Number(columnIndex), column)
  };

  return (
    <div className="column" key={columnIndex}>
      <div className="column-title">
        {column.title}
      </div>

      {column.cards.map((card, cardIndex) => {
        return (
          <Link
            className={"card-link"}
            to={`/board/${kanbanboardId}/${columnIndex}/${cardIndex}`}
            key={cardIndex}
          >
            <KanbanboardCard
              column={column}
              cardIndex={cardIndex}
              handleSave={handleSave} />
          </Link>
        )
      })}
      {
        !!Session.user ? (
          <AddNewCard kanbanboardId={kanbanboardId} columnIndex={columnIndex} />
        ) : null
      }
    </div>
  );
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
      <input
        className="card-input"
        placeholder="Add another card"
        onChange={handleChange}
        value={cardTitle}
      />
      <span className="add-card-btn" onClick={handleClick}>
        +
      </span>
    </div>
  )
};

export default KanbanboardColumn;