import * as React from "react";
import {useState} from "react";
import {CardType} from "../../type/CardType";
import Session from "../../session/Session";

export const AddComment: React.FC<{ card: CardType, handleSave: (card: CardType) => void }> = ({card, handleSave}) => {
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
    const updatedCard: CardType = {
      ...card,
      comments: [...comments, {value: comment, user: Session.user}]
    };
    handleSave(updatedCard);
    setComment("");
  };

  return (
    <div>
      <input
        className="card-detail-input"
        type="text"
        value={comment}
        onChange={handleChange}
        placeholder="Write a comment..."
      />
      <img
        className="description-btn"
        src="data:image/png;base64,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"
        alt="save"
        onClick={handleClick}
      />
    </div>
  )
};