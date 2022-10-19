export const set_selected_tab = "set_selected_tab"

export const setSelectedTabSuccess = (selectedTab) => ({
     type: set_selected_tab,
     payload: { selectedTab }
})

export function setSelectedTab(selectedTab) {
     return dispatch => {
          dispatch(setSelectedTabSuccess(selectedTab))
     }
}