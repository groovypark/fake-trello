import * as React from "react";
import {Card} from "../../type/Card";
import {AttachmentComp} from "./AttachmentComp";
import {AddAttachment} from "./AddAttachment";

export const Attachments: React.FC<{ card: Card, handleSave: (card: Card) => void }>
  = ({card, handleSave}) => {
  const {
    attachments
  } = card;

  return (
    <div>
      <h3>Attachments</h3>
      {attachments.map((attachment, i) => (
        <AttachmentComp key={i} attachment={attachment}/>
      ))}
      <AddAttachment card={card} handleSave={handleSave}/>
    </div>
  )
};