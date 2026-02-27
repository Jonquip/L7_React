import { useState, useEffect } from 'react'
import './App.css'
import TodoList from './components/TodoList'
import AddTodoModal from './components/AddTodoModal'
import FilterButtons from './components/FilterButtons'

function App() {
  const [tasks, setTasks] = useState([])
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [filter, setFilter] = useState('all')

  useEffect(() => {
    fetch('http://localhost:3001/tasks')
      .then(res => res.json())
      .then(setTasks)
      .catch(() => {})
  }, [])

  const addTask = (newTask) => {
    const taskWithId = { ...newTask, id: Date.now() }
    
    fetch('http://localhost:3001/tasks', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(taskWithId)
    })
      .then(res => res.json())
      .then(saved => {
        setTasks([...tasks, saved])
        setIsModalOpen(false)
      })
  }

  const deleteTask = (id) => {
    fetch(`http://localhost:3001/tasks/${id}`, { method: 'DELETE' })
      .then(() => {
        setTasks(tasks.filter(t => t.id !== id))
      })
  }

  const updateTask = (updatedTask) => {
    setTasks(tasks.map(t => t.id === updatedTask.id ? updatedTask : t))
    
    fetch(`http://localhost:3001/tasks/${updatedTask.id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(updatedTask)
    }).catch(() => {})
  }

  const getFilteredTasks = () => {
    if (filter === 'active') return tasks.filter(t => t.status === 'active')
    if (filter === 'completed') return tasks.filter(t => t.status === 'done')
    return tasks
  }

  return (
    <div className="app">
      <h1>Список задач</h1>
      
      <div className="top-bar">
        <FilterButtons currentFilter={filter} onFilterChange={setFilter} />
        <button className="add-btn" onClick={() => setIsModalOpen(true)}>
          Добавить задачу
        </button>
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
    </div>
  )
}

export default App