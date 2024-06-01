import React, { useState, useEffect } from "react";
import "./TodoList.css";

const TodoList = () => {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState("");

  // Load tasks from localStorage when the component mounts
  useEffect(() => {
    const storedTasks = JSON.parse(localStorage.getItem("tasks"));
    if (storedTasks) {
      setTasks(storedTasks);
    }
  }, []);

  // Save tasks to localStorage whenever the tasks state changes
  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  // Add a new task
  const addTask = () => {
    if (newTask.trim() === "") return;
    const newTasks = [...tasks, { text: newTask, completed: false }];
    setTasks(newTasks);
    setNewTask("");
  };

  // Remove a task by its index
  const removeTask = (index) => {
    const newTasks = tasks.filter((_, i) => i !== index);
    setTasks(newTasks);
  };

  // Mark a task as completed
  const markTaskAsComplete = (index) => {
    const newTasks = tasks.map((task, i) =>
      i === index ? { ...task, completed: !task.completed } : task
    );
    setTasks(newTasks);
  };

  // Handle input change
  const handleInputChange = (e) => {
    setNewTask(e.target.value);
  };

  // Sort tasks alphabetically by text
  const sortTasks = () => {
    const sortedTasks = [...tasks].sort((a, b) => a.text.localeCompare(b.text));
    setTasks(sortedTasks);
  };

  return (
    <div className="todo-list">
      <h1>To-Do List</h1>
      <div className="task-input">
        <input
          type="text"
          value={newTask}
          onChange={handleInputChange}
          placeholder="Add a new task"
        />
        <button onClick={addTask}>Add</button>
        <div className="task-actions">
          <button onClick={sortTasks}>Sort Tasks</button>
        </div>
      </div>
      <ul className="tasks">
        {tasks.map((task, index) => (
          <li key={index} className={task.completed ? "completed" : ""}>
            <span>{task.text}</span>
            <div>
              <button onClick={() => markTaskAsComplete(index)}>
                {task.completed ? "Undo" : "Complete"}
              </button>
              <button
                onClick={() => removeTask(index)}
                style={{ color: "red" }}
              >
                Remove
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TodoList;
