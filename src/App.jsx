import { useState, useEffect } from 'react'
import './App.css'
import TodoList from './components/TodoList'
import AddTodoModal from './components/AddTodoModal'
import initialTasks from './data/tasks.json'

function App() {
  const [tasks, setTasks] = useState([])
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [filter, setFilter] = useState('all')

  useEffect(() => {
    setTasks(initialTasks)
  }, [])

  const addTask = (newTask) => {
    setTasks([...tasks, { ...newTask, id: Date.now() }])
    setIsModalOpen(false)
  }

  const deleteTask = (id) => {
    setTasks(tasks.filter(task => task.id !== id))
  }

  const updateTask = (updatedTask) => {
    setTasks(tasks.map(task => 
      task.id === updatedTask.id ? updatedTask : task
    ))
  }

  const getFilteredTasks = () => {
    switch(filter) {
      case 'active':
        return tasks.filter(task => task.status === 'active')
      case 'completed':
        return tasks.filter(task => task.status === 'done')
      default:
        return tasks
    }
  }

  return (
    <div className="app">
      <h1>Список задач</h1>
      
      <div className="top-bar">
        <div className="filters">
          <button 
            className={`filter-btn ${filter === 'all' ? 'active' : ''}`}
            onClick={() => setFilter('all')}
          >
            Все задачи
          </button>
          <button 
            className={`filter-btn ${filter === 'active' ? 'active' : ''}`}
            onClick={() => setFilter('active')}
          >
            Активные задачи
          </button>
          <button 
            className={`filter-btn ${filter === 'completed' ? 'active' : ''}`}
            onClick={() => setFilter('completed')}
          >
            Выполненные задачи
          </button>
        </div>
      </div>

      <TodoList 
        tasks={getFilteredTasks()} 
        onDelete={deleteTask}
        onUpdate={updateTask}
      />

      <AddTodoModal 
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onAdd={addTask}
      />
      <div className="top-bar">
        <div className="filters"></div>
            <button className="add-btn" onClick={() => setIsModalOpen(true)}>
              Добавить задачу
            </button>
        </div>
    </div>
  )
}

export default App