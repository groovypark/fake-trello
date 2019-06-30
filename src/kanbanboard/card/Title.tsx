import * as React from "react";
import {useState} from "react";
import {CardType} from "../../type/CardType";

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
        <input type="text" value={titleInput} onChange={handleChange}/>
        <button onClick={handleEditMode}>Cancel</button>
        <button onClick={handleClick}>Save</button>
      </div>
    )
  }

  return (
    <div onClick={handleEditMode} style={editable ? {cursor: "pointer"} : {}}>
      title: {title}
    </div>
  )
};