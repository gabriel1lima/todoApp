import React from 'react';
import { View, Text, TouchableOpacity, TextInput, StyleSheet } from 'react-native';
import { Container, Header, Item, Icon, Input, Content } from 'native-base';
import { createStore } from 'redux';
import devToolsEnhancer from 'remote-redux-devtools';
import { Provider } from 'react-redux';
import rootReducer from './reducers';
import TodoForm from './components/TodoForm';
import TodoList from './components/TodoList';

const store =  createStore(rootReducer, devToolsEnhancer());

export default class TodoApp extends React.Component {
    render(){
        return(
            <Provider store={store}>
                <Container style={styles.container}>
                    <TodoForm />
                    <TodoList />
                </Container>
            </Provider>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'rgb(237, 240, 241)'
    },
});