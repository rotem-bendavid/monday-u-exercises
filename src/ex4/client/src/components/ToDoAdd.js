import React, { useState, useRef, useEffect } from 'react';
import { connect } from "react-redux";
import { addTodoAction } from "../redux/actions/todo-actions"

function ToDoAdd(props) {
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
        props.add_todo(input);
        setInput('');
    };

    return (
            
            <form onSubmit={handleSubmit}>
                <>
                <div className="new-task">
                    <input
                        placeholder='Add new TO-DO'
                        value={input}
                        onChange={handleChange}
                        name='text'
                        id='list-item-input'
                        ref={inputRef}
                    />
                    <button onClick={handleSubmit} id='list-item-submit'>
                        +
                    </button>
                </div>
                </>
            </form>
      );
}

const mapDispatchToProps = dispatch =>({
    add_todo: input => dispatch(addTodoAction(input))
})

export default connect(null,mapDispatchToProps)(ToDoAdd);