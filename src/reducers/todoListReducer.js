import { ADD_TODO, TOOGLE_TODO, UPDATE_TODO, DELETE_TODO, SYNC_TODOS } from "../actions";
import { AsyncStorage } from 'react-native';

let nextId = 0;
AsyncStorage.getItem('@TodoApp:todosID').then(response => {nextId = JSON.parse(response)});

const todoListReducer = (state = [], action) => {
    
    switch (action.type) {
        case SYNC_TODOS:
            return action.todos
        case ADD_TODO:            
            const newTodo = {
                id: nextId++,
                text: action.text,
                done: false
            }
            AsyncStorage.multiSet([
                ['@TodoApp:todos', JSON.stringify([...state, newTodo])], 
                ['@TodoApp:todosID', JSON.stringify(nextId)]
            ]);
            return [...state, newTodo]
            
            case UPDATE_TODO:
                const stateUpdate =  state.map(todo => {
                    if(todo.id === action.todo.id){
                        return action.todo;
                    }
                    return todo;
                });
                AsyncStorage.setItem('@TodoApp:todos', JSON.stringify(stateUpdate));
                return stateUpdate;


        case DELETE_TODO:
            const index = state.map(todo => todo.id).indexOf(action.todo.id);
            const stateTemp = [
                ...state.slice(0, index),
                ...state.slice(index + 1)
            ];
            AsyncStorage.setItem('@TodoApp:todos', JSON.stringify(stateTemp));
            return stateTemp;
            
        case TOOGLE_TODO:
            const stateToogleUpdate = state.map(todo => {
                if(todo.id === action.todoId){
                    return {
                        ...todo,
                        done: !todo.done
                    }
                }
                return todo;
            });

            AsyncStorage.multiSet([
                ['@TodoApp:todos', JSON.stringify(stateToogleUpdate)], 
                ['@TodoApp:todosID', JSON.stringify(nextId)]
            ]);

            return stateToogleUpdate;
        default:
            return state;
    }
}

export default todoListReducer;