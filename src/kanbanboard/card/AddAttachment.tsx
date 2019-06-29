import * as React from "react";
import {Card} from "../../type/Card";
import Session from "../../session/Session";
import {uploadFileToStorage} from "./uploadFileToStorage";

export const AddAttachment: React.FC<{ card: Card, handleSave: (card: Card) => void }>
  = ({card, handleSave}) => {

  const handleChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    if (Session.user === null) {
      alert("로그인 해주세요");
      return;
    }
    if (!e.target.files) {
      return
    }
    const file = e.target.files[0];
    const url = await uploadFileToStorage(file);

    const {
      attachments
    } = card;
    const updatedCard: Card = {
      ...card,
      attachments: [...attachments, {url, user: Session.user, type: file.type}]
    };
    handleSave(updatedCard)
  };

  return (
    <div>
      <h3>Add Attachment</h3>
      <input type="file" onChange={handleChange}/>
    </div>
  )
}