import * as React from "react";
import {useState} from "react";
import {CardType} from "../../type/CardType";
import Session from "../../session/Session";

export const AddCheck: React.FC<{ card: CardType, handleSave: (card: CardType) => void }> = ({card, handleSave}) => {
  const [value, setValue] = useState("");
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value)
  };

  const handleClick = () => {
    if (Session.user === null) {
      alert("로그인 해주세요");
      return;
    }
    if (!value) {
      return;
    }
    const {
      checklist
    } = card;
    const updatedCard: CardType = {
      ...card,
      checklist: [...checklist, {value, checked: false, user: Session.user}]
    };
    handleSave(updatedCard);
    setValue("");
  };

  return (
    <div>
      <h3>Add Check</h3>
      <input type="text" value={value} onChange={handleChange}/>
      <button onClick={handleClick}>save</button>
    </div>
  )
};