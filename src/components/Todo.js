import React from 'react';
import { toogleTodo, setEditingTodo, deleteTodo } from '../actions';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import { Icon } from 'native-base';
import { connect } from 'react-redux';

class Todo extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <View key={this.props.todo.id} style={styles.buttonListContainer}>
        <TouchableOpacity
          onPress={() => this.props.dispatchToogleTodo(this.props.todo.id)}
          onLongPress={() => this.props.dispatchEditingTodo(this.props.todo)}
          style={[styles.button, { width: '90%' }]}
        >
          <Text
            style={[
              styles.texto,
              this.props.todo.done ? styles.textoLine : null
            ]}
          >
            {todo.done ? (
              <Icon name="checkbox" style={{ color: 'green' }} />
            ) : (
              <Icon name="alert" style={{ color: 'red' }} />
            )}
            {' ' + todo.text}
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => this.props.dispatchDeleteTodo(this.props.todo)}
        >
          <Icon style={{ color: 'red', marginLeft: 15 }} name="trash" />
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  buttonListContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'
  },
  button: {
    backgroundColor: 'white',
    borderRadius: 10,
    paddingTop: 10,
    paddingHorizontal: 5,
    marginBottom: 8,
    marginHorizontal: 2,
    elevation: 5,
    shadowColor: '#000000',
    shadowOpacity: 0.8,
    shadowRadius: 2,
    shadowOffset: {
      height: 1,
      width: 1
    }
  },
  texto: {
    color: 'black',
    fontSize: 18,
    paddingBottom: 15
  },
  textoLine: {
    color: 'grey',
    textDecorationLine: 'line-through'
  }
});

export default connect(
  null,
  {
    dispatchToogleTodo: toogleTodo,
    dispatchEditingTodo: setEditingTodo,
    dispatchDeleteTodo: deleteTodo
  }
)(Todo);
