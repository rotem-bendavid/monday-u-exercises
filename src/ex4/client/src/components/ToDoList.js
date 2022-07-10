import React, { useState } from 'react';

const Todo = ({ todos, completeTodo, removeTodo }) => {
  
  return todos.map((todo) => (
      <div className={todo.isComplete ? 'list-item complete':'list-item'} key={todo.id} onClick={() => alert(todo.text)}>
        {todo.text}
        <input type="checkbox" className='list-item-status-checkbox' checked={todo.isComplete} readOnly onClick={(e) => {e.stopPropagation(); completeTodo(todo.id)}}/>
        <img className='list-item-delete' src="../../images/delete_icon.svg" onClick={(e) => {e.stopPropagation(); removeTodo(todo.id)}}/>

      </div>
  ));
};

export default Todo;
