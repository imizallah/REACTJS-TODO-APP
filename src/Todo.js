import React, { useState } from 'react';
import { List, ListItem, ListItemAvatar, Avatar, ListItemText, Button, Modal } from '@material-ui/core';
import './Todo.css';
import db  from './firebase';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import { makeStyles } from '@material-ui/core/styles';

function rand() {
  return Math.round(Math.random() * 20) - 10;
}

function getModalStyle() {
  const top = 50 + rand();
  const left = 50 + rand();

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
}

const useStyles = makeStyles(theme => ({
  paper: {
    position: 'absolute',
    width: 400,
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));

function Todo(props) {
  const classes = useStyles();

  const todo = props.text.todo;

  // getModalStyle is not a pure function, we roll the style only on the first render
  const [modalStyle] = React.useState(getModalStyle);
  const [open, setOpen] = useState(false); //State for modal opening
  const [input, setInput] = useState(todo); //State to edit todo input, The initials value is the todo to be edited

  const handleOpen = () => {
    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false);
  }

  const updateTodo = () => {
    //Update the todo with new input
    db.collection('todos').doc(props.text.id).set({
      todo: input //Setting the db todo to what is sent on the input field
    }, { merge: true }); //merge: true prevents you from overwriting what was already in there

    setOpen(false);
  }


  const body = (
    <div style={modalStyle} className={classes.paper}>
      <h2 id="simple-modal-title">::: Todo Editor :::</h2>

      <input value={input} onChange={e => setInput(e.target.value)} />
      <Button variant="contained" color="primary" onClick={updateTodo}>Update Todo</Button>
      <p id="simple-modal-description">
        Please enter a value to edit your todo item...
      </p>
      <Button variant="contained" color="Secondary" onClick={handleClose}>Close</Button>

      {/* <SimpleModal /> */}
    </div>
  );

  
  return (
    <>
      <Modal
        open={open} //A piece of state that tells us if the modal is open or not
        onClose={handleClose} //A function that handles what happen when you open the modal
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
      >
        {body}
      </Modal>
      <List>
        <ListItem>
          <ListItemText primary="Todo:" secondary={ todo } />
        </ListItem>
        <Button variant="contained" color="success" onClick={handleOpen}><EditIcon /> Edit</Button>
        <Button variant="contained" color="secondary" onClick={event => db.collection('todos').doc(props.text.id).delete()}>
          <DeleteIcon /> 
          DELETE
        </Button>
      </List>
    </>
  )
}

export default Todo
