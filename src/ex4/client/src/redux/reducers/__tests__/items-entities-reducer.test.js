import reducer,{itemsEntitiesReducer,initialState} from '../items-entities-reducer'
import actionTypes from '../../actions/constant';
//import itemsEntitiesReducer from '../items-entities-reducer';
import { addTodoAction } from '../../actions/todo-actions';


const todos = [{id: 2, todo:'new todo', status: true}];
const todoToAdd = {id: 100, todo:'new todo - test', status: false};

test('should return the initial state when passed an empty action', () => {
  expect(reducer(undefined, {type:undefined})).toEqual({todos:[]});
})

test('get todos from DB', () => {
    const previousState= initialState;
    const result = reducer(previousState, {type: actionTypes.GET_TODOS, payload: todos});
    expect(result).toEqual({todos: todos});
})

describe('add and delete todo reducer', () => {
    const previousState= initialState;
    const result = reducer(previousState, {type: actionTypes.ADD_TODO, payload: todoToAdd});
    test ("should add todoToAdd to array",() => {
        expect(result.todos.length).toBe(previousState.todos.length+1)    
    })
    test ("should add todoToAdd with right text to array", () => {
        expect((result.todos).filter(e=> e.todo==='new todo - test').length).not.toBe(0);
    })
    test ("should delete todoToAdd from array", () => {
        const result = reducer(previousState, {type: actionTypes.DELETE_TODO, payload: todoToAdd.id});
        expect((result.todos).filter(e=> e.todo==='new todo - test').length).toBe(0);
    })
})

describe('check change status reducer', () => {
    const previousState= initialState;
    const prevStatus = todoToAdd.status;
    const addTodoToAdd = reducer(previousState, {type: actionTypes.ADD_TODO, payload: todoToAdd});
    const result = reducer(addTodoToAdd, {type:actionTypes.CHANGE_STATUS, payload:(todoToAdd.id)});
    test ("should change todoToAdd status",() => {
        expect((result.todos).find(e=> (e.id===todoToAdd.id)).status).toBe(!prevStatus)    
    })
})
