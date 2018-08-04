export const SYNC_TODOS = 'SYNC_TODOS';
export const syncTodos = () => ({
    type: SYNC_TODOS
})

export const ADD_TODO = 'ADD_TODO';
export const addTodo = text => ({
    type: ADD_TODO,
    text
});


export const TOOGLE_TODO = 'TOOGLE_TODO';
export const toogleTodo = todoId => ({
    type: TOOGLE_TODO,
    todoId
});


export const SET_TODO_TEXT = 'SET_TODO_TEXT';
export const setTodoText = text => ({
    type: SET_TODO_TEXT,
    text
});

export const SET_EDITING_TODO = 'SET_EDITING_TODO';
export const setEditingTodo = todo => ({
    type: SET_EDITING_TODO,
    todo
});

export const UPDATE_TODO = 'UPDATE_TODO';
export const updateTodo = todo => ({
    type: UPDATE_TODO,
    todo
});

export const DELETE_TODO = 'DELETE_TODO';
export const deleteTodo = todo => ({
    type: DELETE_TODO,
    todo
})