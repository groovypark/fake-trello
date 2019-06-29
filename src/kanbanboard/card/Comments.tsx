import * as React from "react";
import {Card} from "../../type/Card";
import {CommentComp} from "./CommentComp";
import Session from "../../session/Session";
import {AddComment} from "./AddComment";

export const Comments: React.FC<{ card: Card, handleSave: (card: Card) => void }> = ({card, handleSave}) => {
  const {
    comments
  } = card;
  return (
    <div>
      <h3>Comments</h3>
      {comments.map((comment, i) => (
        <CommentComp
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