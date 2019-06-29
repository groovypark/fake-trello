import * as React from "react";
import {useEffect, useState} from "react";
import {Card} from "../../type/Card";
import {Check} from "../../type/Check";

export const CheckBox: React.FC<{ index: number, handleSave: (card: Card) => void, check: Check, card: Card, editable: boolean  }>
  = (props) => {
  const {
    index,
    handleSave,
    check,
    card,
    editable
  } = props;
  const [checked, setChecked] = useState(check.checked);

  useEffect(() => {
    setChecked(check.checked)
  }, [check.checked]);
  const handleToggle = () => {
    setChecked(!checked);

    const { checklist } = card;

    checklist[index].checked = !checked;

    const updatedCard: Card = {
      ...card,
      checklist
    };
    handleSave(updatedCard)
  };

  const handleDelete = () => {
    const { checklist } = card;
    checklist.splice(index, 1);

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

  const [editing, setEditing] = useState(false);
  const [checkInput, setCheckInput] = useState(check.value);

  const handleEditMode = () => {
    if (!editable) {
      return;
    }
    setEditing(!editing);
    setCheckInput(check.value)
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCheckInput(e.target.value)
  };

  const handleClick = (e: React.SyntheticEvent) => {
    const {
      checklist
    } = card;
    e.preventDefault();
    checklist[index].value = checkInput;
    const updatedCard: Card = {
      ...card,
      checklist
    };
    handleSave(updatedCard);
    setEditing(false);
  };
  if (editing) {
    return (
      <div>
        <input type="text" value={checkInput} onChange={handleChange}/>
        <button onClick={handleEditMode}>cancel</button>
        <button onClick={handleClick}>save</button>
        <button onClick={handleDelete}>delete</button>
      </div>

    )
  }

  return (
    <div>
      <span style={checked ? {...checkedStyle, cursor: "pointer"} : {cursor: "pointer"}}>
        <input type="checkbox" checked={checked} onChange={handleToggle}/>
        <span onClick={handleEditMode}>{check.value}</span>
      </span>
    </div>
  )
};