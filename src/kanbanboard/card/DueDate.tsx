import * as React from "react";
import {useState} from "react";
import {Card} from "../../type/Card";
import Calendar from "react-calendar";
import * as firebase from "firebase";

export const DueDate: React.FC<{ card: Card, editable: boolean, handleSave: (card: Card) => void }>
  = ({card, editable, handleSave}) => {
  const {
    dueDate
  } = card;

  const [editing, setEditing] = useState(false);
  const handleEditMode = () => {
    if (!editable) {
      return;
    }
    setEditing(!editing);
  };

  const handleClick = (date: Date) => {
    const updatedCard = {
      ...card,
      dueDate: firebase.firestore.Timestamp.fromDate(date)
    };

    handleSave(updatedCard);
    setEditing(false);
  };

  if (editing) {
    return (
      <div>
        <h3>DueDate</h3>
        <Calendar
          onClickDay={handleClick}
        />
        <button onClick={handleEditMode}>Cancel</button>
      </div>
    )
  }

  return (
    <div onClick={handleEditMode} style={editable ? {cursor: "pointer"} : {}}>
      <h3>DueDate</h3>
      {dueDate.toDate().toLocaleDateString()}
    </div>
  )
};