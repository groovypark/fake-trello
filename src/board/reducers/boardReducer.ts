import {Card} from "../../type/Card";

export const LOAD_ACTION   = 'board/LOAD_ACTION';
export const CREATE_ACTION = 'board/CREATE_ACTION';
export const UPDATE_ACTION = 'board/UPDATE_ACTION';
export const REMOVE_ACTION = 'board/REMOVE_ACTION';

export const loadCards = () => {
  return ({
    type: LOAD_ACTION
  }) as const;
};

export const createCard = (card: Card) => {
  return ({
    type: CREATE_ACTION,
    payload: {
      card
    }
  }) as const;
};

export const updateCard = (card: Card) => {
  return ({
    type: UPDATE_ACTION,
    payload: {
      card
    }
  }) as const;
};

export const removeCard = (card: Card) => {
  return ({
    type: REMOVE_ACTION,
    payload: {
      card
    }
  }) as const;
};

type BoardActions = ReturnType<typeof loadCards>
  | ReturnType<typeof createCard>
  | ReturnType<typeof updateCard>
  | ReturnType<typeof removeCard>

export type BoardState = {
  cards: Card[]
}

const initialState: BoardState = {
  cards: []
};

function boardReducer(state: BoardState = initialState, action: BoardActions)  {
  switch (action.type) {
    case LOAD_ACTION:
      return {
        ...state,
      };
    case CREATE_ACTION:
      return {
        ...state,
        cards: [...state.cards, action.payload.card]
      };
    case UPDATE_ACTION:
      // TODO
      return {
        ...state,
      };
    case REMOVE_ACTION:
      // TODO
      return {
        ...state,
      };
  }
  return state
}

export default boardReducer;