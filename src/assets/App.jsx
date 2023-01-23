import { useState, useEffect } from "react";
import { TaskCreator } from "../components/TaskCreator";
import { TaskTable } from "../components/TaskTable";

export const App = () => {

    const [taskItems, setTaskItems] = useState([]);

    const createNewTask = (taskName) => {
        if (!taskItems.find(task => task.name === taskName)) {
            setTaskItems([...taskItems, { name: taskName, done: false }]);
        }
    }

    const toggleTask = task =>{
        setTaskItems(
            taskItems.map( t => (t.name === task.name) ? {...t , done:!t.done} : t )
        )
    }

    useEffect(()=>{
        let data = localStorage.getItem('tasks');
        if (data) {
            setTaskItems(JSON.parse(data)) 
        }
    }, [])

    useEffect(() => {
        localStorage.setItem('tasks', JSON.stringify(taskItems))
    }, [taskItems])

    return (
        <div className="App">
            <TaskCreator createNewTask={createNewTask} />
            <TaskTable tasks = {taskItems} toggleTask={toggleTask}/>
        </div>
    )
}
