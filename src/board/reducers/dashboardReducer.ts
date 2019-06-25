import {Board} from "../../type/Board";

export const LOAD_DASHBOARD_ACTION = "dashboard/LOAD_DASHBOARD_ACTION";

export const loadDashboard = (dashboard: DashBoardState) => {
  return ({
    type: LOAD_DASHBOARD_ACTION,
    payload: {
      dashboard
    }
  }) as const
};


type BoardAction = ReturnType<typeof loadDashboard>

type DashBoardState = {
  boards: Board[]
}

const initialState = null;

function dashboardReducer(state: DashBoardState | null = initialState, action: BoardAction) {
  switch (action.type) {
    case LOAD_DASHBOARD_ACTION: {
      const {
        dashboard
      } = action.payload;
      return dashboard
    }
  }
  return state
}

export default dashboardReducer;