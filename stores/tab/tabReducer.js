import * as tabActionType from "./tabActions";
const initialState = {
     selectedTab: ""
}
const tabReducer = (state = initialState, action) => {
     switch (action.type) {
          case tabActionType.set_selected_tab:
               return {
                    ...state,
                    selectedTab: action.payload.selectedTab
               }
          default:
               return state
     }
}

export default tabReducer;