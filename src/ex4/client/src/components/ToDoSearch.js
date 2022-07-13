import React,{ useState, useRef, useEffect } from 'react';
import { connect } from "react-redux";
import { searchTodoAction } from "../redux/actions/view-actions";
import { AiOutlineSearch } from "react-icons/ai";

function ToDoSearch(props){
    const [input, setInput] = useState('');

    const inputRef = useRef(null);

    useEffect(() => {
      inputRef.current.focus();
    });

    const handleChange = e => {
        setInput(e.target.value);
    }

    const handleSubmit = e => {
        e.preventDefault();
        props.search_todo(input);
        setInput('');
    };

    return (
        <div className="todo-search">
            <input className="search-input" placeholder="Search TO-DO" value={input} onChange={handleChange} ref={inputRef}/>
            <button className="search-button" onClick={handleSubmit}><AiOutlineSearch/></button>
        </div>
    )
}
  
const mapDispatchToProps = (dispatch) => ({
    search_todo: (input) => dispatch(searchTodoAction(input)),
});

export default connect(null, mapDispatchToProps)(ToDoSearch);
