import React, {Component} from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { createStore } from 'redux';


const initialState = {
  count: 0
};
//This Function is a reducer for the Counter APP
function appReducer(state = initialState, action = {}) {
  switch (action.type) {
    case "INCREMENT":
      return {
        ...state,
        count: state.count + 1
      };
    case "DECREMENT":
      return {
        ...state,
        count: state.count - 1
      };
    default:
      return state;
  }

}

//Creation and Initialization of createStore and Store.
const store = createStore(appReducer);

export default class App extends Component {
 
  constructor(props){
    super(props);
    //Counter is use for storing the value store.
    this.state = {
      counter: 0,
    };
    //for updating the state of counter from the value of store
    store.subscribe(() => {
      this.setState({
        counter: store.getState().count
      });
    });
  }

  //methods for Adding or subtractiong value to the counter
  //use to access the Reducer Function.
  increment(){
    store.dispatch({type: 'INCREMENT'});
  }
  decrement(){
    store.dispatch({type: 'DECREMENT'});
  }
  
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.counterHeader}>Counter</Text>
        <View style={styles.counter}>
          <TouchableOpacity style={styles.button} onPress={this.decrement}> 
            <Text style={styles.buttonText}>-</Text>
          </TouchableOpacity>
          <Text style={styles.counterCount}>{this.state.counter}</Text>
          <TouchableOpacity style={styles.button} onPress={this.increment}> 
            <Text style={styles.buttonText}>+</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  counter: {
    alignItems: 'center',
  },
  counterHeader: {
    fontSize: 25,
    marginBottom: 20,
  },
  counterCount: {
    fontSize: 30,
    padding: 10,
  },
  button: {
    width: 80,
    height:40,
    backgroundColor: '#ddd',
    alignItems: 'center',
    borderRadius: 5,
  },
  buttonText: {
    fontSize: 28,
  },
});
