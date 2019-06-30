import * as React from "react";
import {useState} from "react";
import {CardType} from "../../type/CardType";

export const Description: React.FC<{ card: CardType, editable: boolean, handleSave: (card: CardType) => void }>
  = ({card, editable, handleSave}) => {
  const {
    description
  } = card;
  const [descriptionInput, setDescriptionInput] = useState(description);
  const [editing, setEditing] = useState(false);
  const handleEditMode = () => {
    if (!editable) {
      return;
    }
    setEditing(!editing);
    setDescriptionInput(description);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDescriptionInput(e.target.value)
  };

  const handleClick = () => {
    const updatedCard: CardType = {
      ...card,
      description: descriptionInput
    };
    handleSave(updatedCard);
    setEditing(false);
  };

  if (editing) {
    return (
      <div>
        <input type="text" value={descriptionInput} onChange={handleChange}/>
        <button onClick={handleEditMode}>Cancel</button>
        <button onClick={handleClick}>Save</button>
      </div>
    )
  }

  return (
    <div onClick={handleEditMode} style={editable ? {cursor: "pointer"} : {}}>
      description: {description}
    </div>
  )
};