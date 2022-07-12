import React from 'react';
import { connect } from "react-redux";
import { viewAllAction, viewActiveAction, viewCompletedAction } from "../redux/actions/view-actions";


function ToDoHide(props){
    return (
        <div className="todo-hide-buttons">
            <button className="hide-bt-all" onClick={() => props.view_all()}>View all</button>
            <button className="hide-bt-active" onClick={() => props.view_active()}>Active</button>
            <button className="hide-bt-completed" onClick={() => props.view_completed()}>Completed</button>
        </div>
    )
}
  
const mapDispatchToProps = (dispatch) => ({
    view_all: () => dispatch(viewAllAction()),
    view_active: () => dispatch(viewActiveAction()),
    view_completed: () => dispatch(viewCompletedAction()),
});

export default connect(null, mapDispatchToProps)(ToDoHide);