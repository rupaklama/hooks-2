import React, { useState, useReducer } from 'react';
import { v4 as uuidv4 } from 'uuid';

// initialState - our store of data
const initialTasksState = {
    tasks: [],
    completedTasks: []
}

// action types
const TYPES = {
    ADD_TASK: 'ADD_TASK',
    COMPLETE_TASK: 'COMPLETE_TASK',
    DELETE_TASK: 'DELETE_TASK'
}

// Reducer function to process state &
// to return relevant state for the component
const tasksReducer = (state, action) => { // two params state & action
    // console.log('state', state, 'action', action)

    switch(action.type) {
        case TYPES.ADD_TASK:
            return {
                // new state
                ...state,
                // overriding tasks prop with new array 
                tasks: [...state.tasks, action.task] // new array & action object
            }
        case TYPES.COMPLETE_TASK:
            const { completedTask } = action;

            return {
                ...state,
                completedTask: [...state.completedTask, completedTask]
            }
        default:
            return state;
    }
   
}

function Tasks () {
    // having multiple state allow us to update only particular prop state 
    // easy for refactoring for any purpose
    const [taskText, setTaskText] = useState('');
    const [tasks, setTasks] = useState([]);
    const [completedTasks, setCompletedTasks] = useState([]);

    // state - return state from the reducer
    // dispatch - passes action objects to reducer
    const [state, dispatch] = useReducer(tasksReducer, initialTasksState); // reducer func & initial state
    
    

    const handleAddTask = (event) => {
      // calling dispatch on click, dispatching state object with task prop
      dispatch({ type: TYPES.ADD_TASK, task: { taskText, id: uuidv4() } })

      // creating new tasks array with objects
      setTasks([...tasks, { taskText, id: uuidv4() }]) // adding whole object with id
      setTaskText('')
    }
    
    // passing completed tasks & removing it
    // func returning func
    const handleCompleteTask = completedTask => () => {

        dispatch({ type: TYPES.COMPLETE_TASK, completedTask })

        // completedTasks to hold removed values
        setCompletedTasks([...completedTasks, completedTask]);
        // removing completedTasks to say task is complete
        // create a new array without the current clicked element id
        setTasks(tasks.filter(task => task.id !== completedTask.id));
    }

    const HandleDeleteTask = task => () => {
        setCompletedTasks(completedTasks.filter(t => t.id !== task.id));
      }
    

    
    const renderTasks = tasks.map(task => {

        const { id, taskText } = task;
        return (
            <div key={id} onClick={handleCompleteTask(task)}>
                {taskText}
            </div>
        )
    })

    const renderCompletedTasks = completedTasks.map(task => {
        const { id, taskText } = task;

        return (
            <div key={id}>
                {taskText}{' '}
                <span onClick={HandleDeleteTask(task)} className='delete-task'>x</span>
            </div>
        )
    })

    // console.log('tasks', tasks);
    // console.log('completedTasks', completedTasks);

    return (
        <div>
            <h3>Tasks</h3>
            <div className="form">
                <input value={taskText} onChange={e => setTaskText(e.target.value)} />
                <button onClick={handleAddTask}>Add Task</button>
            </div>

            { renderTasks }
            {renderCompletedTasks}
        </div>
    )
}

export default Tasks;