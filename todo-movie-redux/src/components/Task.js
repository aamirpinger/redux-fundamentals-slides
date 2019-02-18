import React from 'react'
import List from './List'
import {
    toggleTaskStatusAction,
    deleteTaskAction,
    createTaskAction
} from '../actions/actions'

// I have created Task as class component and Movies as functional component 
// Purpose of doing both in two differnt ways is just to show the 
// way of doing both ways. As these both are stateless component so we hav
// choice of doing in any of these two ways
class Task extends React.Component{
    render(){

        const toggle_task = (task_id)  => {
            this.props.dispatch(toggleTaskStatusAction(task_id))
        }
        
        const deleteTask = (task_id) => {
            this.props.dispatch(deleteTaskAction(task_id))
        }
        
        const addToDoTask = () => {
            const name = document.getElementById("txt_task")
            const value = name.value
            name.value = ''
        
            this.props.dispatch(createTaskAction(value))
        }
        
        return (
            <div>
                <h2>ToDo Task</h2>
                <input
                    type="text"
                    id="txt_task"
                    placeholder="Enter ToDo task here..."
                />
    
                <button id="addTodo" onClick={addToDoTask}>Add Task to List</button>
    
                <List items={this.props.tasks}
                    toggle={toggle_task}
                    delete={deleteTask}
                />
            </div>
        )
        }
}

export default Task