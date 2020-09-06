import React, { useState, useEffect } from 'react'; 
import './App.css';
import { Button, FormControl, InputLabel, Input } from '@material-ui/core';
import Todo from './Todo';
import db from './firebase';
import firebase from 'firebase';

function App() {
  const [todos, setTodos] = useState([]);
  const [input, setInput] = useState("");


  // useEffect(function, dependencies)

  useEffect(() => {
    // This code is executed once when the component is called'
    db.collection('todos').orderBy('timestamp', 'desc').onSnapshot(snapshot => {
      // console.log("HMmmmmmmmmmmm; ", snapshot.docs.map(doc => doc.data()))
      setTodos(snapshot.docs.map(doc => ({ id: doc.id, todo: doc.data().todo}))) //
    });

  }, [input])


    // This gets fired off when we click on the button
  const addTodo = event => {
    event.preventDefault();
    db.collection('todos').add({
      todo: input,
      timestamp: firebase.firestore.FieldValue.serverTimestamp()
    })
    setInput(""); //Clear whats in the input field ewady to type another
  }
  return (
    <div className="App">
      <h1>Rannysoft Technologies!</h1>
      <form>
        <FormControl>
          <InputLabel>Say your mind</InputLabel>
          <Input value={input} onChange={e =>setInput(e.target.value)} />
          <Button disabled={!input} type="submit" onClick={addTodo}  variant="contained" color="primary">
          Add Todo
          </Button>
        </FormControl>

      </form>
      
      <ul>
        {
          todos.map(todo => (
            <Todo text={todo} key={todo.id} />
          ))  
        }
      </ul>
    </div>
  );
}

export default App;
