
import firebase from 'firebase';

const firebaseApp = firebase.initializeApp({
  //Your own firebase project keys go her
  apiKey: "AIzaSyDuZcbCggvWQgytjLiNlrv8K6B4zn-d3E0",
  authDomain: "react-todo-app-c8.firebaseapp.com",
  databaseURL: "https://react-todo-app-c8.firebaseio.com",
  projectId: "react-todo-app-c8",
  storageBucket: "react-todo-app-c8.appspot.com",
  messagingSenderId: "183341368442",
  appId: "1:183341368442:web:37727fc7be5d7cd19327c3",
  measurementId: "G-LK7BCJYBQK"
});

const db = firebaseApp.firestore();

export default db;

// or export { db };