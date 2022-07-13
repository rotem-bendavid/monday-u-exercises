import React, { useState,useEffect,useCallback } from 'react';
import ToDoAdd from './ToDoAdd';
import ToDoList from './ToDoList';
import ToDoHide from './ToDoHide';
import PropTypes from "prop-types";
import { connect } from 'react-redux';
import {getTodosAction} from '../redux/actions/todo-actions';

function ToDoManager(props) {
    const [loading, setLoading] = useState(false);

    async function importTodos() {
        try {
            await props.get_todos();
            setLoading(false);
        }
        catch{
            console.error("err: couldn't import todos");
            setLoading(true);
        }
    }

    useEffect(() => {
        importTodos();
    },[])

    useEffect(() => {
        if (loading) importTodos();
    },[loading])

    if (loading) return( <div>Loading..</div>);
    
    return (
    <>
        <div className="app-container">
            <div className="list-container">
                <h1>TO-DO list</h1>
                    <ToDoAdd/>
                    <ToDoHide/>
                    <ul id="list">
                        <ToDoList/>
                    </ul>
                    
            </div>
        </div>

    </>
    );
}

const mapStateToProps = (state) => {
    return {
      todos: state.itemsEntities.todos,
    };
  };

  const mapDispatchToProps = (dispatch) => ({
    get_todos: () => dispatch(getTodosAction()),
  });

export default connect(mapStateToProps,mapDispatchToProps)(ToDoManager);