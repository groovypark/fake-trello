import {RouteComponentProps} from "react-router";
import * as React from "react";
import {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {KanbanboardState, loadKanbanbaord, resetKanbanboard} from "../kanbanboardReducer";
import {subscribeKanbanboard, UnsubscribeFn} from "../subscribeKanbanboard";
import {CardType} from "../../type/CardType";
import Session from "../../session/Session";
import {updateCard} from "../updateCard";
import {Title} from "./Title";
import {Description} from "./Description";
import {Checklist} from "./CheckList";
import {Comments} from "./Comments";
import {UserInfo} from "./UserInfo";
import {DueDate} from "./DueDate";
import {Attachments} from "./Attachments";
import Header from "../../layout/Header";

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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (!kanbanboardState.kanbanboard) {
    return (<div>Loading...</div>)
  }

  const card = kanbanboardState.kanbanboard.columns[Number(columnIndex)].cards[Number(cardIndex)];

  const handleSave = (card: CardType) => {
    updateCard(kanbanboardId, Number(columnIndex), Number(cardIndex), card)
  };

  return (
    <div>
      <Header/>
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
      <DueDate
        card={card}
        editable={!!Session.user && Session.user.userId === card.user.userId}
        handleSave={handleSave}
      />
      <Attachments
        card={card}
        handleSave={handleSave}
      />
    </div>
  )
};

export default CardDetail;