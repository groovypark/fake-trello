import * as React from "react";
import {CardType} from "../../type/CardType";
import Session from "../../session/Session";
import {uploadFileToStorage} from "./uploadFileToStorage";

export const AddAttachment: React.FC<{ card: CardType, handleSave: (card: CardType) => void }>
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
    const updatedCard: CardType = {
      ...card,
      attachments: [...attachments, {url, user: Session.user, type: file.type}]
    };
    handleSave(updatedCard)
  };

  return (
    <div>
      <input type="file" onChange={handleChange}/>
    </div>
  )
};