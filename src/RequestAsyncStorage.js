import { AsyncStorage } from 'react-native';

export function save (obj){
	AsyncStorage.setItem('@TodoApp:todos', JSON.stringify(obj));
}

export function multiSave(obj1, obj2){
	AsyncStorage.multiSet([
		['@TodoApp:todos', JSON.stringify(obj1)], 
		['@TodoApp:todosID', JSON.stringify(obj2)]
	])
}