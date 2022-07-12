import actionTypes from "../actions/constant";

const initialState = {
  todos:[],
};

 const itemsEntitiesReducer = (state = initialState, action) => {
  switch (action.type) {
    default:
      return state;
    
    case actionTypes.ADD_TODO: {
      let withNewTodo = state.todos.concat(action.payload);
      return {...state,todos:withNewTodo};
    };

    case actionTypes.DELETE_TODO: {
      const withoutDeleted = state.todos.filter((todo) => todo.id !== action.payload);
      return {...state,todos: withoutDeleted}
    };

    case actionTypes.CHANGE_STATUS: {
      return {
        ...state,
        todos: state.todos.map((todo) => {
          if (todo.id === action.payload) {
            todo.status = !todo.status
          }
          return todo
        })
      }
    };

    case actionTypes.GET_TODOS: {
      return {...state,todos: (action.payload)}
    };
  }
};

export default itemsEntitiesReducer;