import * as React from "react";
import {useState} from "react";
import {CardType} from "../../type/CardType";
import Calendar from "react-calendar";
import * as firebase from "firebase";

export const DueDate: React.FC<{ card: CardType, editable: boolean, handleSave: (card: CardType) => void }>
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
      <div className="card-detail-wrapper">
        <div className="card-detail-content">DueDate</div>
        <img
          className="description-btn"
          src="data:image/png;base64,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"
          alt="cancel"
          onClick={handleEditMode}
        />
        <Calendar
          onClickDay={handleClick}
        />
      </div>
    )
  }

  return (
    <div className="card-detail-wrapper">
      <div className="card-detail-content">DueDate</div>
      <div onClick={handleEditMode} style={editable ? {cursor: "pointer"} : {}}>
        {dueDate.toDate().toLocaleDateString()}
      </div>
    </div>
  )
};