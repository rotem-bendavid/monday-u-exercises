import actionTypes from "../actions/constant";

const initialState = {
  view:'',
  search:'',
};

const itemsViewReducer = (state = initialState, action) => {
  switch (action.type) {
    default:
      state.view='view_all';
      return state;
  
      case actionTypes.VIEW_ALL: {
        return {...state,view:'view_all',search:''}};
  
      case actionTypes.VIEW_ACTIVE: {
        return {...state,view:'view_active',search:''}};
  
      case actionTypes.VIEW_COMPLETED: {
        return {...state,view:'view_completed',search:''}};
      
      case actionTypes.SEARCH_TODO: {
        return {...state,search:(action.payload)}};
    }
};
export default itemsViewReducer;