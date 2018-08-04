import { ADD_TODO, TOOGLE_TODO, UPDATE_TODO, DELETE_TODO, SYNC_TODOS } from "../actions";
import { AsyncStorage } from 'react-native';

let nextId = 1;

const todoListReducer = (state = [], action) => {
    switch (action.type) {
        case SYNC_TODOS:
            AsyncStorage.getItem('todos')
                .then((todos) => {
                    return [...state, todos];
                })
                .catch(() => {
                    AsyncStorage.setItem('todos', [{}]);
                    return state;
                })
        case ADD_TODO:
            const newTodo = {
                id: nextId++,
                text: action.text,
                done: false
            }
            return [...state, newTodo]

        case UPDATE_TODO:
            return state.map(todo => {
                if(todo.id === action.todo.id){
                    return action.todo;
                }
                return todo;
            });

        case DELETE_TODO:
            const index = state.map(todo => todo.id).indexOf(action.todo.id);
            const stateTemp = [
                ...state.slice(0, index),
                ...state.slice(index + 1)
            ];
            return stateTemp;
            
        case TOOGLE_TODO:
            return state.map(todo => {
                if(todo.id === action.todoId){
                    return {
                        ...todo,
                        done: !todo.done
                    }
                }
                return todo;
            });
        default:
            return state;
    }
}

export default todoListReducer;