import { useEffect, useState } from "react";
import { v4 as uuidv4 } from 'uuid';
import Todo from "./Todo";
import './assets/styles.css';

const App = () => {

  const [todos, setTodos] = useState([]);
  const [input, setInput] = useState("");
  const [taskSummary, setTaskSummary] = useState({});
  const handleTodoAdd = () => {
    if (input.trim() !== "") {
      setTodos((curr) => {
        const newTodo = {
          title: input,
          id: uuidv4(),
          completed: false,
        };
        return [...todos, newTodo];
      });
    }

    setInput("");
  };

  const handleDelete = (id) => {
    const filteredTodos = todos.filter((e) => e.id !== id);
    setTodos(filteredTodos);
  };

  const toggleComplete = (id) => {
    setTodos(prevTodos =>
      prevTodos.map(todo =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  useEffect(() => {
    const countPendingTasks = todos.filter((todo) => todo.completed === false).length
    const totalTasks = todos.length
    setTaskSummary((e) => {
      return { pendingTasks: countPendingTasks, totalTasks: totalTasks }
    })
  }, [todos])
  return (
    <>
      <div className="app-container">
        <div className="status-div">
          {
            taskSummary.pendingTasks > 0
              ? `${taskSummary.pendingTasks} / ${taskSummary.totalTasks} tasks Pending 🎯`
              : 'You have no pending tasks 🎉'
          }
        </div>
      </div>
      <div className="app-container">
        <div className="input-container">
          <input
            className="todo-input"
            type="text"
            placeholder="Enter a task"
            value={input ?? ""}
            onChange={(e) => setInput(e.target.value)}
          />
          <button className="add-button" onClick={handleTodoAdd}>Add</button>

        </div>
        <div className="todo-list-container">
          <ul className="todo-list">
            {todos.length > 0 && todos.map((currTodo) => {
              return (
                <Todo
                  key={currTodo.id}
                  item={currTodo}
                  deleteHandler={handleDelete}
                  toggleComplete={toggleComplete}
                />
              );
            })}
          </ul>
        </div>
      </div>
    </>
  );
}

export default App;