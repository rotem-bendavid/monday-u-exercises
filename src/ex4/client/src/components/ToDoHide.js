import React, {useState} from 'react';
import { connect } from "react-redux";
import { viewAllAction, viewActiveAction, viewCompletedAction } from "../redux/actions/view-actions";
import ToDoSearch from './ToDoSearch';
import { AiOutlineSearch } from "react-icons/ai";

function ToDoHide(props){
    const [isSearchHidden, setIsSearchHidden] = useState(true);

    return (
        <div>
            <div className="todo-hide-buttons">
                <button className="hide-bt-all" onClick={() => {props.view_all();setIsSearchHidden(true)}}>View all</button>
                <button className="hide-bt-active" onClick={() => {props.view_active();setIsSearchHidden(true)}}>Active</button>
                <button className="hide-bt-completed" onClick={() => {props.view_completed();setIsSearchHidden(true)}}>Completed</button>
                <button onClick={()=>{setIsSearchHidden(!isSearchHidden)}}><AiOutlineSearch/></button>
            </div>
                <>
                {!isSearchHidden? <div><ToDoSearch className="show-search"/></div>:null}
                </>
        </div>
    )
}
  
const mapDispatchToProps = (dispatch) => ({
    view_all: () => dispatch(viewAllAction()),
    view_active: () => dispatch(viewActiveAction()),
    view_completed: () => dispatch(viewCompletedAction()),
});

export default connect(null, mapDispatchToProps)(ToDoHide);