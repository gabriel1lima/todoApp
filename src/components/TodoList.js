import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity, ScrollView } from 'react-native';
import { Icon } from 'native-base';
import { connect } from "react-redux";
import { toogleTodo, setEditingTodo, deleteTodo } from '../actions';

class TodoList extends React.Component{
    onPress(todoId){
        this.props.dispatchToogleTodo(todoId)
    }

    render(){
        const {todos} = this.props;
        return(
            <ScrollView contentContainerStyle={{padding: 20}}>
                {
                    todos.length > 0 
                        ? <View style={{flexDirection: 'row', alignItems: 'center'}}>
                            <Text style={[styles.texto, styles.textoTitle]}>
                                <Icon style={styles.textoTitle} name="list-box"/> Tarefas |
                            </Text>
                            <Text style={[styles.textoSubTitle]}>
                                <Icon name='checkbox' style={{color: 'green', fontSize: 20}} />
                                {" "+todos.filter((obj) => obj.done == true).length}
                            </Text>
                            <Text style={[styles.textoSubTitle]}>
                                <Icon name='alert' style={{color: 'red', fontSize: 20}} /> 
                                {" "+todos.filter((obj) => obj.done == false).length}
                            </Text>
                          </View>
                          
                        : <View style={{alignItems: 'center'}}>
                            <Icon style={styles.icon} name="folder" />
                            <Text style={{color: 'rgba(0,0,0,0.2)'}}>Nenhum ToDo adicionado</Text>
                          </View>
                }

                {
                    todos.map(todo => (
                            <View key={todo.id} style={styles.buttonListContainer}>
                                <TouchableOpacity 
                                    onPress={() => this.props.dispatchToogleTodo(todo.id)}
                                    onLongPress={() => this.props.dispatchEditingTodo(todo)}
                                    style={[styles.button, {width: '90%'}]}
                                >
                                    <Text 
                                        style={[
                                            styles.texto, 
                                            todo.done ? styles.textoLine : null
                                        ]}
                                    >
                                        {
                                            todo.done 
                                            ? <Icon name='checkbox' style={{color: 'green'}} />
                                            : <Icon name='alert' style={{color: 'red'}} />
                                        }
                                        {" "+todo.text}
                                    </Text>
                                </TouchableOpacity>

                                <TouchableOpacity onPress={() => this.props.dispatchDeleteTodo(todo)}>
                                    <Icon style={{color: 'red', marginLeft: 15}} name="trash" />
                                </TouchableOpacity>
                            </View>
                        
                    ))
                   
                }
            </ScrollView>
        )
    }

}

const styles = StyleSheet.create({
    texto: {
        color: 'black', fontSize: 18, paddingBottom: 15
    },
    textoTitle: {
        fontWeight: 'bold', fontSize: 25, paddingBottom: 3, color: 'rgba(0,0,0,0.15)'
    },
    textoSubTitle: {
        fontWeight: 'bold', fontSize: 15, color: 'rgba(0,0,0,0.3)', marginHorizontal: 4
    },
    textoLine: {
        color: 'grey',
        textDecorationLine: 'line-through'
    },
    icon: {
        fontSize: 100, color: 'rgba(0,0,0,0.1)'
    },
    buttonListContainer: {
        flexDirection: 'row', justifyContent: 'center', alignItems: 'center'
    },
    button: {
        backgroundColor: 'white', 
        borderRadius: 10, 
        paddingTop: 10, 
        paddingHorizontal: 5, 
        marginBottom: 8,
        marginHorizontal: 2,
        elevation:5,
        shadowColor: "#000000",
        shadowOpacity: 0.8,
        shadowRadius: 2,
        shadowOffset: {
            height: 1,
            width: 1
        }
    }
})

const mapStateToProps = state => {
   const { todos } = state;
   return { todos };
}

export default connect(
    mapStateToProps, 
    {
        dispatchToogleTodo: toogleTodo,
        dispatchEditingTodo: setEditingTodo,
        dispatchDeleteTodo: deleteTodo
    }
)(TodoList)