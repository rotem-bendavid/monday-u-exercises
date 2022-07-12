import React from 'react';
import { connect } from "react-redux";
import { changeStatusAction, deleteTodoAction } from "../redux/actions/todo-actions";
import { Button } from "monday-ui-react-core";
import Delete from "monday-ui-react-core/dist/icons/Delete";

const Todo = (props) => {
  return props.todos.map((todo) => (
      <div className={todo.status ? 'list-item complete':'list-item'} key={todo.id} hidden={checkView(props.view,todo.status)} onClick={() => alert(todo.todo)}>
        {todo.todo}
        <input type="checkbox" className='list-item-status-checkbox' checked={todo.status} readOnly onClick={(e) => {e.stopPropagation(); props.change_status(todo.id)}}/>
        <Button className='list-item-delete' rightIcon={Delete} onClick={(e) => {e.stopPropagation(); props.delete_todo(todo.id)}}/>
      </div>
  ));
};

function checkView(view,todoStatus) {
  if (view === 'view_active' && todoStatus === true) {return true;}
  if (view === 'view_completed' && todoStatus === false) {return true;}
  return false;
}

const mapStateToProps = (state) => {
  return {
    todos: state.itemsEntities.todos,
    view: state.itemsView.view,
  };
};

const mapDispatchToProps = (dispatch) => ({
  change_status: (id) => dispatch(changeStatusAction(id)),
  delete_todo: (id) => dispatch(deleteTodoAction(id)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Todo);

