// App.js

import { useState } from "react";
import "./index.css";

export default function App() {
  const [task, setTask] = useState("");
  const [tasks, setTasks] = useState([]);

  function addTask() {
    if (task.trim() !== "") {
      setTasks([...tasks, { id: Date.now(), text: task, isComplete: false }]);
      setTask("");
    }
  }

  return (
    <div className="App">
      <AddTaskForm task={task} onSetTask={setTask} onAddTask={addTask} />
      <TasksList tasks={tasks} onSetTasks={setTasks} />
    </div>
  );
}

function AddTaskForm({ task, onSetTask, onAddTask }) {
  function handleSubmit(e) {
    e.preventDefault();
    onAddTask();
  }

  return (
    <form className="add-form" onSubmit={handleSubmit}>
      <label>Add the task to do: </label>
      <input
        type="text"
        value={task}
        onChange={(e) => onSetTask(e.target.value)}
      ></input>
      <button type="submit">Add</button>
    </form>
  );
}

function TasksList({ tasks, onSetTasks }) {
  return (
    <ul className="task-container">
      {tasks.map((task) => (
        <Task key={task.id} task={task} onSetTasks={onSetTasks} tasks={tasks} />
      ))}
    </ul>
  );
}

function Task({ task, onSetTasks, tasks }) {
  const [isComplete, setIsComplete] = useState(task.isComplete);

  function toggleTaskCompletion() {
    setIsComplete(!isComplete);
  }

  function deleteTask(id) {
    onSetTasks(tasks.filter((currentTask) => currentTask.id !== id));
  }

  return (
    <li className={`task ${isComplete ? "completed" : ""}`}>
      {task.text}
      {isComplete ? null : (
        <>
          <button onClick={toggleTaskCompletion}>✅</button>
          <button onClick={() => deleteTask(task.id)}>❌</button>
        </>
      )}
    </li>
  );
}
