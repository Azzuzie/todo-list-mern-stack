import React, { useState, Fragment,useEffect } from 'react';
import './App.css'
import axios from 'axios'



  const Tasks = () => {
    const [tasks, setTasks] = useState([]);
    // const [id, setId] = useState(0);
    const [task, setTask] = useState('');
    const [editTaskId, setEditTaskId] = useState(null); // Track the task being edited
    const [editedTask, setEditedTask] = useState('');
  
    const onSubmitForm = async (e) => {
      e.preventDefault();
  
      if (task.trim() !== '') {
        // setId(id + 1);
  
        const body = {
          task
        };
  
        // Add the task to the backend
        await axios.post('http://localhost:4400/addTask', body);
  
        // Update the tasks state
        setTasks([...tasks, body]);
        setTask(''); // Clear the input box after submitting the task
      }
    };
  
    const deleteTask = async (taskId) => {
      // Delete the task from the backend
      console.log(taskId)
      await axios.delete(`http://localhost:4400/deleteTask/${taskId}`);
  
      // Update the tasks state
      setTasks(tasks.filter(task => task.id !== taskId));
    };
  
    const editTask = (taskId) => {
      // Find the task being edited and set the state variables accordingly
      const taskToEdit = tasks.find(task => task._id === taskId);
      if (taskToEdit) {
        setEditTaskId(taskId);
        setEditedTask(taskToEdit.task);
      }
    };
  
    const saveEditedTask = async () => {
      // Update the task in the backend
      const body={ task: editedTask }
      await axios.put(`http://localhost:4400/updateTask/${editTaskId}`, body);
  
      // Update the tasks state
      setTasks(tasks.map(task => {
        if (task.id === editTaskId) {
          return { ...task, task: editedTask };
        }
        return task;
      }));
      setEditTaskId(null);
    };
  
    useEffect(() => {
      const getTasks = async () => {
        // Get the tasks from the backend
        const tasksFromBackend = await axios.get('http://localhost:4400/allTasks');
        // Update the tasks state
        
        setTasks(tasksFromBackend.data.tasks);
        console.log(tasks)
      };
      getTasks();
    },);


  
  return (
    <Fragment>
      <div className='box'>
        <h1>Todo List</h1>
        <form onSubmit={onSubmitForm}>
          <label>Enter Task:-</label>
          <input type='text' value={task} onChange={e => setTask(e.target.value)} className='ip' />
          <input type='submit' value="Add Task" className='sub-btn' />
          <ul>
            {tasks.map(taskItem => (
              <div className='list-box' key={taskItem._id}>
                <div>
                  {editTaskId === taskItem._id ? (
                    // If task is being edited, show an input field
                    <input type='text' value={editedTask} onChange={e => setEditedTask(e.target.value)} />
                  ) : (
                    // Otherwise, show the task text
                    <li>{taskItem.task}</li>
                  )}
                </div>
                <div>
                  {editTaskId === taskItem._id ? (
                    // If task is being edited, show a Save button
                    <button onClick={saveEditedTask} className='list-btn'>Save</button>
                  ) : (
                    // Otherwise, show Edit and Delete buttons
                    <>
                      <button onClick={() => editTask(taskItem._id)} className='list-btn'>Edit</button>
                      <button onClick={() => deleteTask(taskItem._id)} className='list-btn'>Delete</button>
                    </>
                  )}
                </div>
              </div>
            ))}
          </ul>
        </form>
      </div>
    </Fragment>
  );
};

export default Tasks;
