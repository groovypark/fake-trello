import { Kanbanboard } from "../../type/Kanbanboard";

export const ADD_KANBANBOARD_ACTION = "dashboard/ADD_KANBANBOARD_ACTION";

export const addKanbanboard = (kanbanboard: Kanbanboard) => {
  return ({
    type: ADD_KANBANBOARD_ACTION,
    payload: {
      kanbanboard
    }
  }) as const
};

type DashboardAction = ReturnType<typeof addKanbanboard>

export type DashboardState = {
  kanbanboards: Kanbanboard[]
}

const initialState: DashboardState = {
  kanbanboards: []
};

function dashboardReducer(state: DashboardState = initialState, action: DashboardAction) {
  switch (action.type) {
    case ADD_KANBANBOARD_ACTION: {
      const {
        kanbanboard
      } = action.payload;
      return {
        ...state, 
        kanbanboards: [...state.kanbanboards, kanbanboard]
      }
    }
  }
  return state
}

export default dashboardReducer;