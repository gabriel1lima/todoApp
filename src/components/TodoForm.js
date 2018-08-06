import React from 'react'
import { View, Text, TouchableOpacity, TextInput, StyleSheet, AsyncStorage } from 'react-native';
import { Header, Item, Icon } from 'native-base';
import { connect } from 'react-redux';
import { addTodo, setTodoText, updateTodo, syncTodos } from '../actions';

class TodoForm extends React.Component {
    onPress(){
        if(this.props.todo.id)
            return this.props.dispatchUpdateTodo(this.props.todo)
        
        if(this.props.todo.text != '')
            this.props.dispatchAddTodo(this.props.todo.text);
        
    }
    componentDidMount(){
        const INITIAL_STATE = [
            {
                id: 0,
                text: 'Estudar Redux',
                done: false
            },
            {
                id: 1,
                text: 'Estudar React Native',
                done: false
            },
            {
                id: 2,
                text: 'Fazer TCC',
                done: false
            },
        ]

        //AsyncStorage.setItem('todos', JSON.stringify(INITIAL_STATE));

        AsyncStorage.getItem('todos').then(response => this.props.dispatchSyncTodos(JSON.parse(response)));
        
    }

    render(){
        return(
            <Header searchBar rounded>   
                <Item>
                    <TextInput
                        style={styles.textInput}
                        underlineColorAndroid= 'rgba(0,0,0,0)' 
                        placeholder="Novo À fazer"
                        onChangeText={text => this.props.dispatchSetTodoText(text)} 
                        value={this.props.todo.text}
                    />
                </Item>
                <TouchableOpacity 
                    style={styles.buttonSaveAdd} 
                    transparent
                    onPress={() => this.onPress()}
                >
                    <Text style={styles.textButtonSaveAdd}>
                        {this.props.todo.id 
                            ? <Icon name="refresh" style={{color: 'white'}} /> 
                            : <Text style={{fontSize: 35}}>+</Text>}
                    </Text>
                </TouchableOpacity>
            </Header>
        )
    }
}

const styles = StyleSheet.create({
    texto: {
        fontWeight: 'bold', color: 'black', fontSize: 20, paddingBottom: 15
    },
    textInput: {
        width: '100%', alignSelf: 'center', padding: 10
    },
    buttonSaveAdd: {
        alignSelf: 'center', paddingLeft: 25, paddingRight: 15
    },
    textButtonSaveAdd: {
        fontWeight: 'bold', color: 'white'
    }
})

const mapStateToProps = state => {
    return{
        todo: state.editingTodo
    }
}

export default connect(
    mapStateToProps, 
    {
        dispatchAddTodo: addTodo,
        dispatchSetTodoText: setTodoText,
        dispatchUpdateTodo: updateTodo,
        dispatchSyncTodos: syncTodos,
    }
)(TodoForm);