import {RouteComponentProps} from "react-router";
import * as React from "react";
import {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {KanbanboardState, loadKanbanbaord, resetKanbanboard} from "../kanbanboardReducer";
import {subscribeKanbanboard, UnsubscribeFn} from "../subscribeKanbanboard";
import {Card} from "../../type/Card";
import {Attachment} from "../../type/Attachment";
import Session from "../../session/Session";
import {updateCard} from "../updateCard";
import {Title} from "./Title";
import {Description} from "./Description";
import {Checklist} from "./CheckList";
import {Comments} from "./Comments";
import {UserInfo} from "./UserInfo";

const CardDetail = (props: RouteComponentProps<{kanbanboardId: string; columnIndex: string; cardIndex: string}>) => {
  const {
    kanbanboardId,
    columnIndex,
    cardIndex
  } = props.match.params;

  const dispatch = useDispatch();


  const kanbanboardState = useSelector<any, KanbanboardState>(state => state.kanbanboardReducer);

  useEffect(() => {
    const unsubscribe: UnsubscribeFn = subscribeKanbanboard(kanbanboardId, (kanbanboard) => {
      dispatch(loadKanbanbaord(kanbanboard))
    });

    return () => {
      unsubscribe();
      dispatch(resetKanbanboard())
    }
  }, []);

  if (!kanbanboardState.kanbanboard) {
    return (<div>Loading...</div>)
  }

  const card = kanbanboardState.kanbanboard.columns[Number(columnIndex)].cards[Number(cardIndex)];

  const handleSave = (card: Card) => {
    updateCard(kanbanboardId, Number(columnIndex), Number(cardIndex), card)
  };

  return (
    <div>
      <Title
        card={card}
        editable={!!Session.user && Session.user.userId === card.user.userId}
        handleSave={handleSave}
      />
      <UserInfo
        user={card.user}
      />
      <Description
        card={card}
        editable={!!Session.user && Session.user.userId === card.user.userId}
        handleSave={handleSave}
      />
      <Checklist
        card={card}
        handleSave={handleSave}
      />
      <Comments
        card={card}
        handleSave={handleSave}
      />
      <DueDate dueDate={card.dueDate}/>
      <Attachments attachments={card.attachments}/>
    </div>
  )
};

const DueDate: React.FC<{dueDate: string}> = ({dueDate}) => {
  return(
    <div>
      <h3>DueDate</h3>
    </div>
  )
};

const Attachments: React.FC<{attachments: Attachment[]}> = ({attachments}) => {
  return(
    <div>
      <h3>Attachments</h3>
      {attachments.map((attachment, i) => (
        <div key={i}>{attachment.url}</div>
      ))}
    </div>
  )
};

export default CardDetail;