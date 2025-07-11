import React, { useState } from "react";

function ToDoList() {
  const [tasks, setTasks] = useState(["Eat", "Sleep", "Code"]);
  const [newTask, setNewTask] = useState("");
  const [editIndex, setEditIndex] = useState(null);
  const [editValue, setEditValue] = useState("");

  function handleInputChange(event) {
    setNewTask(event.target.value);
  }
  function addTask() {
    if (newTask.trim() !== "") {
      setTasks([...tasks, newTask]);
      setNewTask("");
    }
  }
  function deleteTask(index) {
    const updatedTasks = tasks.filter((_, i) => i !== index);
    setTasks(updatedTasks);
  }
  function moveTaskup(index) {
    if (index > 0) {
      const updatedTasks = [...tasks];
      [updatedTasks[index], updatedTasks[index - 1]] = [
        updatedTasks[index - 1],
        updatedTasks[index],
      ];
      setTasks(updatedTasks);
    }
  }
  function moveTaskDown(index) {
    if (index < tasks.length - 1) {
      const updatedTasks = [...tasks];
      [updatedTasks[index], updatedTasks[index + 1]] = [
        updatedTasks[index + 1],
        updatedTasks[index],
      ];
      setTasks(updatedTasks);
    }
  }

  const startEditing = (index) => {
    setEditIndex(index);
    setEditValue(tasks[index]);
  };

  const saveEdit = (index) => {
    const updated = [...tasks];
    updated[index] = editValue;
    setTasks(updated);
    setEditIndex(null);
    setEditValue("");
  };

  const cancelEdit = () => {
    setEditIndex(null);
    setEditValue("");
  };
  return (
    <div className="container mt-5">
      <h1 className="text-center mb-4">📝 To-Do List</h1>

      {/* Input Area */}
      <div className="input-group mb-4">
        <input
          type="text"
          className="form-control"
          placeholder="Enter new task..."
          value={newTask}
          onChange={handleInputChange}
        />
        <button className="btn btn-primary" onClick={addTask}>
          Add Task
        </button>
      </div>

      {/* Task List */}
      <ol className="list-group list-group-numbered">
        {tasks.map((task, index) => (
          <li
            key={index}
            className="list-group-item d-flex justify-content-between align-items-center"
          >
            {/* Task display or edit input */}
            <div className="flex-grow-1">
              {editIndex === index ? (
                <input
                  className="form-control"
                  value={editValue}
                  onChange={(e) => setEditValue(e.target.value)}
                />
              ) : (
                <span>{task}</span>
              )}
            </div>

            {/* Buttons */}
            <div className="ms-3">
              {editIndex === index ? (
                <>
                  <button
                    className="btn btn-success btn-sm me-2"
                    onClick={() => saveEdit(index)}
                  >
                    Save
                  </button>
                  <button
                    className="btn btn-secondary btn-sm me-2"
                    onClick={cancelEdit}
                  >
                    Cancel
                  </button>
                </>
              ) : (
                <>
                  <button
                    className="btn btn-warning btn-sm me-2"
                    onClick={() => startEditing(index)}
                  >
                    Edit
                  </button>
                  <button
                    className="btn btn-danger btn-sm me-2"
                    onClick={() => deleteTask(index)}
                  >
                    Delete
                  </button>
                  <button
                    className="btn btn-outline-secondary btn-sm me-2"
                    onClick={() => moveTaskup(index)}
                  >
                    ↑
                  </button>
                  <button
                    className="btn btn-outline-secondary btn-sm"
                    onClick={() => moveTaskDown(index)}
                  >
                    ↓
                  </button>
                </>
              )}
            </div>
          </li>
        ))}
      </ol>
    </div>  
  );
}

export default ToDoList;
