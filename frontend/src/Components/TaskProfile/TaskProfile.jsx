import React, { useState, useEffect } from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import './TaskProfile.css';

const TaskProfile = () => {
const [tasks, setTasks] = useState([]);

useEffect(() => {
const storedTasks = JSON.parse(localStorage.getItem('tasks')) || [];
setTasks(storedTasks);
}, []); 

useEffect(() => {
localStorage.setItem('tasks', JSON.stringify(tasks));
}, [tasks]);


const handleDragEnd = (result) => {
if (!result.destination) return;

const updatedTasks = [...tasks];
const movedTask = updatedTasks.find((task) => task.id === result.draggableId);

// If the task is moved within the same column
if (result.source.droppableId === result.destination.droppableId) {
const startIndex = result.source.index;
const endIndex = result.destination.index;
const splicedTask = updatedTasks.splice(startIndex, 1)[0];
updatedTasks.splice(endIndex, 0, splicedTask);
} else {
// If the task is moved to a different column
movedTask.status = result.destination.droppableId;
}

setTasks(updatedTasks);
};


const addTask = () => {
const newTask = {
id: new Date().getTime().toString(),
title: 'New Task',
status: 'todo',
};

setTasks([...tasks, newTask]);
};

const handleEdit = (taskId, editedTitle) => {
const updatedTasks = tasks.map((task) =>
task.id === taskId ? { ...task, title: editedTitle } : task
);
setTasks(updatedTasks);
};

const handleDelete = (taskId) => {
const updatedTasks = tasks.filter((task) => task.id !== taskId);
setTasks(updatedTasks);
};

const handleStatusChange = (taskId, newStatus) => {
const updatedTasks = tasks.map((task) =>
task.id === taskId ? { ...task, status: newStatus } : task
);
setTasks(updatedTasks);
};

return (
<div className="task-profile">
<h1>Task Profile</h1>
<button className="add-task-btn" onClick={addTask}>
Add Task
</button>

<DragDropContext onDragEnd={handleDragEnd}>
<div className="task-columns">
<Droppable droppableId="todo" key="todo">
{(provided) => (
<div
ref={provided.innerRef}
{...provided.droppableProps}
className="task-column"
>
<h2>To-Do</h2>
{tasks.map((task, index) => (
task.status === 'todo' && (
<Draggable key={task.id} draggableId={task.id} index={index}>
{(provided) => (
<div
ref={provided.innerRef}
{...provided.draggableProps}
{...provided.dragHandleProps}
className="task-card"
>
<input
type="text"
value={task.title}
onChange={(e) => handleEdit(task.id, e.target.value)}
/>
<div className="task-actions">
<div className="dropdown">
<button className="status-btn">{task.status}</button>
<div className="dropdown-content">
<span onClick={() => handleStatusChange(task.id, 'todo')}>To-Do</span>
<span onClick={() => handleStatusChange(task.id, 'doing')}>Doing</span>
<span onClick={() => handleStatusChange(task.id, 'done')}>Done</span>
</div>
</div>
<button className="edit-btn" onClick={() => handleEdit(task.id, prompt('Edit Task:', task.title))}>
Edit
</button>
<button className="delete-btn" onClick={() => handleDelete(task.id)}>
Delete
</button>
</div>
</div>
)}
</Draggable>
)
))}
{provided.placeholder}
</div>
)}
</Droppable>
<Droppable droppableId="doing" key="doing">
{(provided) => (
<div
ref={provided.innerRef}
{...provided.droppableProps}
className="task-column"
>
<h2>Doing</h2>
{tasks.map((task, index) => (
task.status === 'doing' && (
<Draggable key={task.id} draggableId={task.id} index={index}>
{(provided) => (
<div
ref={provided.innerRef}
{...provided.draggableProps}
{...provided.dragHandleProps}
className="task-card"
>
<input
type="text"
value={task.title}
onChange={(e) => handleEdit(task.id, e.target.value)}
/>
<div className="task-actions">
<div className="dropdown">
<button className="status-btn">{task.status}</button>
<div className="dropdown-content">
<span onClick={() => handleStatusChange(task.id, 'todo')}>To-Do</span>
<span onClick={() => handleStatusChange(task.id, 'doing')}>Doing</span>
<span onClick={() => handleStatusChange(task.id, 'done')}>Done</span>
</div>
</div>
<button className="edit-btn" onClick={() => handleEdit(task.id, prompt('Edit Task:', task.title))}>
Edit
</button>
<button className="delete-btn" onClick={() => handleDelete(task.id)}>
Delete
</button>
</div>
</div>
)}
</Draggable>
)
))}
{provided.placeholder}
</div>
)}
</Droppable>
<Droppable droppableId="done" key="done">
{(provided) => (
<div
ref={provided.innerRef}
{...provided.droppableProps}
className="task-column"
>
<h2>Done</h2>
{tasks.map((task, index) => (
task.status === 'done' && (
<Draggable key={task.id} draggableId={task.id} index={index}>
{(provided) => (
<div
ref={provided.innerRef}
{...provided.draggableProps}
{...provided.dragHandleProps}
className="task-card"
>
<input
type="text"
value={task.title}
onChange={(e) => handleEdit(task.id, e.target.value)}
/>
<div className="task-actions">
<div className="dropdown">
<button className="status-btn">{task.status}</button>
<div className="dropdown-content">
<span onClick={() => handleStatusChange(task.id, 'todo')}>To-Do</span>
<span onClick={() => handleStatusChange(task.id, 'doing')}>Doing</span>
<span onClick={() => handleStatusChange(task.id, 'done')}>Done</span>
</div>
</div>
<button className="edit-btn" onClick={() => handleEdit(task.id, prompt('Edit Task:', task.title))}>
Edit
</button>
<button className="delete-btn" onClick={() => handleDelete(task.id)}>
Delete
</button>
</div>
</div>
)}
</Draggable>
)
))}
{provided.placeholder}
</div>
)}
</Droppable>
</div>
</DragDropContext>
</div>
);
};

export default TaskProfile;