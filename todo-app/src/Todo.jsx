import React from 'react';
import './assets/styles.css'; 
const Todo = ({ item, deleteHandler, toggleComplete }) => {
  return (
    <li className={`todo-item ${item.completed ? 'completed' : ''}`}>
      <span 
        className={`todo-text ${item.completed ? 'completed' : ''}`}
        onClick={() => toggleComplete(item.id)}
      >
        {item.title}
      </span>
      <button className="todo-button" onClick={() => deleteHandler(item.id)}>
        <span className="delete-button">✖</span>
      </button>
    </li>
  );
}

export default Todo;