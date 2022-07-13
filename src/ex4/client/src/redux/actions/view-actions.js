import actionsTypes from "./constant/index";

const view_all = () => ({
    type: actionsTypes.VIEW_ALL
  });
  
  const view_active = () => ({
    type: actionsTypes.VIEW_ACTIVE
  });
  
  const view_completed = () => ({
    type: actionsTypes.VIEW_COMPLETED
  });
  
  const search_todo = (data) => ({
    type: actionsTypes.SEARCH_TODO,
    payload: data
  });
  
  export const viewAllAction = () => {
    return dispatch => {
      dispatch(view_all());
    };
  };
  
  export const viewActiveAction = () => {
    return dispatch => {
      dispatch(view_active());
    };
  };
  
  export const viewCompletedAction = () => {
    return dispatch => {
      dispatch(view_completed());
    };
  };

  export const searchTodoAction = (data) => {
    return dispatch => {
      dispatch(search_todo(data));
    };
  };