import Header from "./components/Header";
import Tasks from "./components/Tasks";
import {useState, useEffect} from "react";
import AddTask from "./components/AddTask";
import Footer from "./components/Footer";
import {BrowserRouter as Router, Route} from 'react-router-dom'
import About from "./components/About";

function App() {
    const [showAddTask, setShowAddTask] = useState(false)
    const [tasks, setTasks] = useState([])

    const tasksURL = "http://localhost:5000/tasks"
    const getTaskURL = (id) => {
        return `http://localhost:5000/tasks/${id}`
    }
    useEffect(() => {
        const getTasks = async () => {
            const tasksFromServer = await fetchTasks()
            console.log(tasksFromServer)
            setTasks(tasksFromServer)
        }

        getTasks()

    }, [])

    const fetchTasks = async () => {
        const res = await fetch(tasksURL)
        const data = await res.json()
        return data
    }

    const fetchTask = async (id) => {
        const url = getTaskURL(id)
        const res = await fetch(url)
        const data = await res.json()
        return data
    }


    const addTask = async (task) => {
        const res = await fetch(tasksURL, {
            method: 'POST',
            headers: {
                'Content-type': 'application/json',
            },
            body: JSON.stringify(task),
        })

        const data = await res.json()

        setTasks([...tasks, data])
    }

    const deleteTask = async (id) => {
        const url = getTaskURL(id)
        await fetch(url, {method: 'DELETE'})
        setTasks(tasks.filter((task) => task.id !== id))
    }

    const toggleReminder = async (id) => {
        const taskToToggle = await fetchTask(id)
        const updatedTask = {...taskToToggle, reminder: !taskToToggle.reminder}
        const url = getTaskURL(id)

        const res = await fetch(url, {
            method: 'PUT',
            headers: {
                'Content-type': 'application/json',
            },
            body: JSON.stringify(updatedTask)
        })

        const data = await res.json()

        setTasks(
            tasks.map((task) =>
                task.id === id ? {...task, reminder: data.reminder} : task
            )
        )

        // console.log('toggle', id)
        // setTasks(tasks.map((task) => task.id === id ? {...task, reminder: !task.reminder} : task))
    }


    return (
        <Router>
            <div className="container">
                <Header title="Task Tracker" onAdd={() => setShowAddTask(!showAddTask)} showAdd={showAddTask}/>
                <Route
                    path='/'
                    exact
                    render={(props) => (
                        <>
                            {showAddTask && <AddTask onAdd={addTask}/>}
                            {tasks.length > 0 ?
                                <Tasks tasks={tasks}
                                       onDelete={deleteTask}
                                       onToggle={toggleReminder}
                                />
                                : 'All Tasks are done'}
                        </>
                    )}
                />
                <Route path='/about' component={About}/>
                <Footer/>
            </div>
        </Router>
    );
}

export default App;
