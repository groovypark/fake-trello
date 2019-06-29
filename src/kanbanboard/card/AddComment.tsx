import * as React from "react";
import {useState} from "react";
import {Card} from "../../type/Card";
import Session from "../../session/Session";

export const AddComment: React.FC<{ card: Card, handleSave: (card: Card) => void }> = ({card, handleSave}) => {
  const [comment, setComment] = useState("");
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setComment(e.target.value)
  };

  const handleClick = () => {
    if (Session.user === null) {
      alert("로그인 해주세요");
      return;
    }
    if (!comment) {
      return;
    }
    const {
      comments
    } = card;
    const updatedCard: Card = {
      ...card,
      comments: [...comments, {value: comment, user: Session.user}]
    };
    handleSave(updatedCard);
    setComment("");
  };

  return (
    <div>
      <h3>Add Comment</h3>
      <input type="text" value={comment} onChange={handleChange}/>
      <button onClick={handleClick}>save</button>
    </div>
  )
};