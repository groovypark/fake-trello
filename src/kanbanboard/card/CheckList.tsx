import * as React from "react";
import {Card} from "../../type/Card";
import {CheckBox} from "./CheckBox";
import {AddCheck} from "./AddCheck";
import Session from "../../session/Session";

export const Checklist: React.FC<{ card: Card, handleSave: (card: Card) => void }> = ({card, handleSave}) => {
  const {
    checklist
  } = card;


  return (
    <div>
      {checklist.map((check, i) => {
        const editable = !!Session.user && Session.user.userId === check.user.userId;
        return (
          <CheckBox key={i} index={i} handleSave={handleSave} check={check} card={card} editable={editable}/>
        );
      })}
      <AddCheck handleSave={handleSave} card={card}/>
    </div>
  )
};