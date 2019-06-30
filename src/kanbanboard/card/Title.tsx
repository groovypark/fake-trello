import * as React from "react";
import {useState} from "react";
import {CardType} from "../../type/CardType";
import "./Card.css"

export const Title: React.FC<{ card: CardType, editable: boolean, handleSave: (card: CardType) => void }>
  = ({card, editable, handleSave}) => {

  const {
    title
  } = card;
  const [titleInput, setTitileInput] = useState(title);
  const [editing, setEditing] = useState(false);

  const handleEditMode = () => {
    if (!editable) {
      return;
    }
    setEditing(!editing);
    setTitileInput(title);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitileInput(e.target.value)
  };

  const handleClick = () => {
    const updatedCard: CardType = {
      ...card,
      title: titleInput
    };
    handleSave(updatedCard);
    setEditing(false);
  };

  if (editing) {
    return (
      <div>
        <input
          autoFocus={true}
          className="detail-title-input"
          type="text"
          value={titleInput}
          onChange={handleChange}
        />
        <img
          className="description-btn"
          src="data:image/png;base64,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"
          alt="save"
          onClick={handleClick}
        />
        <img
          className="description-btn"
          src="data:image/png;base64,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"
          alt="cancel"
          onClick={handleEditMode}
        />
      </div>
    )
  }

  return (
    <h1
      className="card-detail-title"
      onClick={handleEditMode}
      style={editable ? {cursor: "pointer"} : {}}
    >
      {title}
    </h1>
  )
};