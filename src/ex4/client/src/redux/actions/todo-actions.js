import actionsTypes from "./constant/index";
import ItemClient from "../../item_client/item_client";

const add_todo = (todo) => ({
  type: actionsTypes.ADD_TODO,
  payload: todo
});

const delete_todo = (id) => ({
  type: actionsTypes.DELETE_TODO,
  payload: id
});

const change_status = (id) => ({
  type: actionsTypes.CHANGE_STATUS,
  payload: id
});

const get_todos = (todos) => ({
    type: actionsTypes.GET_TODOS,
    payload: todos
  });

export const addTodoAction = (todo) => {
  try {
    return async (dispatch) => { 
      const newTodo = (await ItemClient.addTodo(todo));
      dispatch(add_todo(newTodo));
    };
  }
  catch (error) { throw error; }
};

export const deleteTodoAction = (id) => {
  try {
    return async dispatch => {
      await ItemClient.deleteTodo(id);
      dispatch(delete_todo(id));
    };
  }
  catch (error) { throw error; }
};

export const changeStatusAction = (id) => {
  try {
    return async dispatch => {
      await ItemClient.changeStatus(id);
      dispatch(change_status(id));
    };
  }
  catch (error) { throw error; }
};

export const getTodosAction = () => {
    try {
      return async dispatch => {
        const todos = await ItemClient.getTodos();
        dispatch(get_todos(todos));
      };
    }
    catch (error) { throw error; }
  };