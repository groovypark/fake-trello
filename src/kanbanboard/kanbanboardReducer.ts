import {Kanbanboard} from "../type/Kanbanboard";

export const LOAD_KANBANBOARD = "kanbanbaord/LOAD_KANBANBOARD";
export const RESET_KANBANBOARD = "kanbanbaord/RESET_KANBANBOARD";

export const loadKanbanbaord = (kanbanboard: Kanbanboard) => {
  return ({
    type: LOAD_KANBANBOARD,
    payload: {
      kanbanboard
    }
  }) as const
};

export const resetKanbanboard = () => {
  return ({
    type: RESET_KANBANBOARD
  }) as const
};

type KanbanboardAction = ReturnType<typeof loadKanbanbaord> | ReturnType<typeof resetKanbanboard>;

export type KanbanboardState = {
  kanbanboard: Kanbanboard | null
}

const initialState = {
  kanbanboard: null
};

function kanbanboardReducer(state: KanbanboardState = initialState , action: KanbanboardAction) {
  switch (action.type) {
    case LOAD_KANBANBOARD: {
      const {
        kanbanboard
      } = action.payload;

      return {
        ...state,
        kanbanboard
      }
    }
    case RESET_KANBANBOARD: {
      return {
        ...initialState
      }
    }
  }
  return state;
}

export default kanbanboardReducer;