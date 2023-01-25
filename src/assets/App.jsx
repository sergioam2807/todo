import { useState, useEffect } from "react";
import { TaskCreator } from "../components/TaskCreator";
import { TaskTable } from "../components/TaskTable";
import { VisibilityControl } from "../components/VisibilityControl";

export const App = () => {

    const [taskItems, setTaskItems] = useState([]);
    const [showCompleted, setShowCompleted] = useState();

    const createNewTask = (taskName) => {
        if (!taskItems.find(task => task.name === taskName)) {
            setTaskItems([...taskItems, { name: taskName, done: false }]);
        }
    }

    const toggleTask = task => {
        setTaskItems(
            taskItems.map(t => (t.name === task.name) ? { ...t, done: !t.done } : t)
        )
    }

    useEffect(() => {
        let data = localStorage.getItem('tasks');
        if (data) {
            setTaskItems(JSON.parse(data))
        }
    }, [])

    const cleanTask = () => {
        setTaskItems(taskItems.filter(task => !task.done))
        setShowCompleted(false)
    }

    useEffect(() => {
        localStorage.setItem('tasks', JSON.stringify(taskItems))
    }, [taskItems])

    return (
        <main className="bg-dark vh-100 text-white">
            <div className="container p-4 col-md-4 offset-md-4">
                <TaskCreator createNewTask={createNewTask} />
                <TaskTable tasks={taskItems} toggleTask={toggleTask} />

                <VisibilityControl
                    isChecked={showCompleted}
                    setShowCompleted={(checked) => setShowCompleted(checked)}
                    cleanTask={cleanTask}

                />

                {
                    showCompleted && (
                        <TaskTable tasks={taskItems} toggleTask={toggleTask} showCompleted={showCompleted} />
                    )
                }
            </div>
        </main>
    )
}
