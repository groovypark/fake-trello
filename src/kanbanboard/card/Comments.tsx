import * as React from "react";
import {CardType} from "../../type/CardType";
import {Comment} from "./Comment";
import Session from "../../session/Session";
import {AddComment} from "./AddComment";

export const Comments: React.FC<{ card: CardType, handleSave: (card: CardType) => void }> = ({card, handleSave}) => {
  const {
    comments
  } = card;
  return (
    <div className="card-detail-wrapper">
      <div className="card-detail-content">Comments</div>
      {comments.map((comment, i) => (
        <Comment
          key={i}
          card={card}
          comment={comment}
          commentIndex={i}
          handleSave={handleSave}
          editable={!!Session.user && Session.user.userId === comment.user.userId}
        />
      ))}
      <AddComment card={card} handleSave={handleSave}/>
    </div>
  )
};