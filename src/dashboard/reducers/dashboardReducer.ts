import {Kanbanboard} from "../../type/Kanbanboard";
import {User} from "../../type/User";

export const LOAD_KANBANBOARD_LIST = "dashboard/LOAD_KANBANBOARD_LIST";
export const LOAD_USER = "dashboard/LOAD_USER";
export const RESET_DASHBOARD = "dashboard/RESET_DASHBOARD";

export const loadKanbanboardList = (kanbanboardList: Kanbanboard[]) => {
  return ({
    type: LOAD_KANBANBOARD_LIST,
    payload: {
      kanbanboardList
    }
  }) as const
};

export const loadUser = (user: User) => {
  return ({
    type: LOAD_USER,
    payload: {
      user
    }
  }) as const
};

export const resetDashboard = () => {
  return ({
    type: RESET_DASHBOARD,
  }) as const
};

type DashboardAction = ReturnType<typeof loadKanbanboardList>
  | ReturnType<typeof loadUser>
  | ReturnType<typeof resetDashboard>;

export type DashboardState = {
  kanbanboardList: Kanbanboard[]
  user: User | null;
}

const initialState: DashboardState = {
  kanbanboardList: [],
  user: null
};

function dashboardReducer(state: DashboardState = initialState, action: DashboardAction) {
  switch (action.type) {
    case LOAD_KANBANBOARD_LIST: {
      const {
        kanbanboardList
      } = action.payload;
      return {
        ...state,
        kanbanboardList
      }
    }
    case LOAD_USER: {
      const {
        user
      } = action.payload;
      return {
        ...state,
        user
      }
    }
    case RESET_DASHBOARD: {
      return {
        ...initialState
      }
    }
  }
  return state
}

export default dashboardReducer;