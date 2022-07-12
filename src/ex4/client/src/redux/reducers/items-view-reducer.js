import actionTypes from "../actions/constant";

const initialState = {
  view:'',
};

const itemsViewReducer = (state = initialState, action) => {
  switch (action.type) {
    default:
      state.view='view_all';
      return state;
  
      case actionTypes.VIEW_ALL: {
        return {...state,view:'view_all'}};
  
      case actionTypes.VIEW_ACTIVE: {
        return {...state,view:'view_active'}};
  
      case actionTypes.VIEW_COMPLETED: {
        return {...state,view:'view_completed'}};
    }
};
export default itemsViewReducer;