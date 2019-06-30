import * as React from "react";
import {CardType} from "../../type/CardType";
import {Attachment} from "./Attachment";
import {AddAttachment} from "./AddAttachment";

export const Attachments: React.FC<{ card: CardType, handleSave: (card: CardType) => void }>
  = ({card, handleSave}) => {
  const {
    attachments
  } = card;

  return (
    <div className="card-detail-wrapper">
      <div className="card-detail-content">Attachments</div>
      {attachments.map((attachment, i) => (
        <Attachment key={i} attachment={attachment}/>
      ))}
      <AddAttachment card={card} handleSave={handleSave}/>
    </div>
  )
};