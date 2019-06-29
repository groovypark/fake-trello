import * as React from "react";
import {useState} from "react";
import {Card} from "../../type/Card";
import {Comment} from "../../type/Comment";

export const CommentComp: React.FC<{ card: Card, handleSave: (card: Card) => void, commentIndex: number, comment: Comment, editable: boolean }>
  = ({card, handleSave, commentIndex, comment, editable}) => {

  const [commentInput, setCommentInput] = useState(comment.value);
  const [editing, setEditing] = useState(false);

  const handleEditMode = () => {
    if (!editable) {
      return;
    }
    setEditing(!editing);
    setCommentInput(comment.value);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCommentInput(e.target.value)
  };


  const handleClick = (e: React.SyntheticEvent) => {
    const {
      comments
    } = card;
    e.preventDefault();
    comments[commentIndex].value = commentInput;
    const updatedCard: Card = {
      ...card,
      comments
    };
    handleSave(updatedCard);
    setEditing(false);
  };

  const handleDelete = (e: React.SyntheticEvent) => {
    const {
      comments
    } = card;
    e.preventDefault();
    comments.splice(commentIndex, 1);
    const updatedCard: Card = {
      ...card,
      comments
    };
    handleSave(updatedCard);
    setEditing(false);
  };

  if (editing) {
    return (
      <div>
        <input type="text" value={commentInput} onChange={handleChange}/>
        <button onClick={handleEditMode}>Cancel</button>
        <button onClick={handleClick}>Save</button>
        <button onClick={handleDelete}>Delete</button>
      </div>
    )
  }

  return (
    <div onClick={handleEditMode} style={editable ? {cursor: "pointer"} : {}}>
      {comment.user.displayName} : {comment.value}
    </div>
  )
};