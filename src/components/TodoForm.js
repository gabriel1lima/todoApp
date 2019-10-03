import React, { useEffect } from 'react';
import {
  Text,
  TouchableOpacity,
  TextInput,
  StyleSheet,
  AsyncStorage
} from 'react-native';
import { Header, Item, Icon } from 'native-base';
import { useDispatch, useSelector } from 'react-redux';
import { addTodo, setTodoText, updateTodo, syncTodos } from '../actions';

const TodoForm = props => {
  const dispatch = useDispatch();
  const todo = useSelector(state => state.todo);

  const onPress = () => {
    if (todo.id) {
      dispatch(updateTodo(todo));
    }

    if (todo.text != '') {
      dispatch(addTodo(todo.text));
    }
  };

  useEffect(() => {
    AsyncStorage.multiGet(['@TodoApp:todos', '@TodoApp:todosID']).then(
      response => {
        if (response[0][1] != null) {
          dispatch(syncTodos(JSON.parse(response[0][1])));
        } else {
          AsyncStorage.multiSet([
            ['@TodoApp:todos', JSON.stringify([])],
            ['@TodoApp:todosID', JSON.stringify(1)]
          ]);
        }
      }
    );
  });

  return (
    <Header searchBar rounded>
      <Item>
        <TextInput
          style={styles.textInput}
          underlineColorAndroid="rgba(0,0,0,0)"
          placeholder="Nova Tarefa"
          onChangeText={text => dispatch(setTodoText(text))}
          value={todo.text}
        />
      </Item>
      <TouchableOpacity
        style={styles.buttonSaveAdd}
        transparent
        onPress={() => onPress()}
      >
        <Text style={styles.textButtonSaveAdd}>
          {todo.id ? (
            <Icon name="refresh" style={{ color: 'white' }} />
          ) : (
            <Text style={{ fontSize: 35 }}>+</Text>
          )}
        </Text>
      </TouchableOpacity>
    </Header>
  );
};

const styles = StyleSheet.create({
  texto: {
    fontWeight: 'bold',
    color: 'black',
    fontSize: 20,
    paddingBottom: 15
  },
  textInput: {
    width: '100%',
    alignSelf: 'center',
    padding: 10
  },
  buttonSaveAdd: {
    alignSelf: 'center',
    paddingLeft: 25,
    paddingRight: 15
  },
  textButtonSaveAdd: {
    fontWeight: 'bold',
    color: 'white'
  }
});

export default TodoForm;
