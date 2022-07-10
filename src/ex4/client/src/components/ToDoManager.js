import React, { useState,useEffect } from 'react';
import ToDoAdd from './ToDoAdd';
import ToDoList from './ToDoList';
import ItemClient from '../item_client/item_client';

function ToDoManager() {
    const [todos, setTodos] = useState([]);
    const [loading, setLoading] = useState(false);

    async function importTodos() {
        await ItemClient.getTodos()
            .then ((response) => {
                let todoList = response.map(todo => {
                    return {id:todo.id,text:todo.todo,isComplete:todo.status};
                });
                setTodos(todoList);
                setLoading(false);
            })
            .catch ((error) => {
                console.error("err:"+error);
                setLoading(true);
            })
    }

    useEffect(() => {
        importTodos();
    },[])

    useEffect(() => {
        if (loading) importTodos();
    },[loading])

    const addTodo = (async (todo) => {
        if (!todo || /^\s*$/.test(todo)) {
            return
        }
        //db change+re-fetch
        await ItemClient.addTodo(todo)
            .then(() => {
                importTodos();
            })
            .catch((error) => {
                console.error("err:"+error);
            })
    });

    const removeTodo = (async (id) => {
        //db change
        await ItemClient.deleteTodo(id)
            .then (() => {
                //local change
                const removedArr = [...todos].filter(todo => todo.id !== id);
                setTodos(removedArr);
            })
            .catch ((error) => {
                console.error("err:"+error);
            })
      });

    const completeTodo = (async (id) => {
        //db change
        await ItemClient.changeStatus(id)
            .then (() => {
                //local change
                let updatedTodos = todos.map(todo => {
                    if (todo.id === id) {
                        todo.isComplete = !todo.isComplete;
                    }
                return todo;
                })
                setTodos(updatedTodos);
            })
            .catch ((error) => {
                console.error("err:"+error);
            })
      });
    

    if (loading) return( <div>Loading..</div>);
    
    return (
    <>
        <div className="app-container">
            <div className="list-container">
                <h1>TO-DO list</h1>
                    <ToDoAdd onSubmit={addTodo} />
                    <ul id="list">
                        <ToDoList
                        todos={todos}
                        completeTodo={completeTodo}
                        removeTodo={removeTodo}
                        />
                    </ul>
            </div>
        </div>

    </>
    );
}

export default ToDoManager;