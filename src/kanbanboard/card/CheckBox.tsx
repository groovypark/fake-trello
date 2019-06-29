import * as React from "react";
import {useState} from "react";
import {Card} from "../../type/Card";
import {Check} from "../../type/Check";

export const CheckBox: React.FC<{ index: number, handleSave: (card: Card) => void, check: Check, card: Card }> = (props) => {
  const {
    index,
    handleSave,
    check,
    card
  } = props;
  const [checked, setChecked] = useState(check.checked);

  const handleToggle = () => {
    setChecked(!checked);

    const {
      checklist
    } = card;

    checklist[index].checked = !checked;

    const updatedCard: Card = {
      ...card,
      checklist
    };
    handleSave(updatedCard)
  };

  const checkedStyle = {
    color: "#6b778c",
    fontStyle: "italic",
    textDecoration: "line-through"
  };
  return (
    <div onClick={handleToggle} style={checked ? {...checkedStyle, cursor: "pointer"} : {cursor: "pointer"}}>
      <input type="checkbox" checked={checked} onChange={handleToggle}/>
      {check.value}
    </div>
  )
}