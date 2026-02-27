import { useState, useRef, useEffect } from 'react'

const TodoItem = ({ task, onDelete, onUpdate }) => {
  const [editingField, setEditingField] = useState(null)
  const [editValue, setEditValue] = useState('')
  const inputRef = useRef(null)

  useEffect(() => {
    if (editingField && inputRef.current) {
      inputRef.current.focus()
    }
  }, [editingField])

  const startEditing = (field, value) => {
    setEditingField(field)
    setEditValue(value)
  }

  const saveEdit = () => {
    if (!editValue?.trim() && editingField !== 'status' && editingField !== 'deadline') {
      alert('Значение не может быть пустым')
      return
    }

    const updatedTask = { ...task, [editingField]: editValue }
    onUpdate(updatedTask)
    setEditingField(null)
  }

  const getStatusText = (status) => {
    switch(status) {
      case 'active': return 'Активная задача'
      case 'done': return 'Задача выполнена'
      case 'cancelled': return 'Задача отменена'
      default: return status
    }
  }

  const getStatusClass = (status) => {
    switch(status) {
      case 'active': return 'status-active'
      case 'done': return 'status-done'
      case 'cancelled': return 'status-cancelled'
      default: return ''
    }
  }

  const formatDate = (dateString) => {
    if (!dateString) return ''
    const [year, month, day] = dateString.split('-')
    return `${day}.${month}.${year}`
  }

  if (editingField === 'description') {
    return (
      <tr>
        <td>
          <textarea
            ref={inputRef}
            className="edit-input"
            value={editValue}
            onChange={(e) => setEditValue(e.target.value)}
            onBlur={saveEdit}
            style={{ width: '100%', minHeight: '60px' }}
          />
        </td>
        <td>
          <span className={`status-badge ${getStatusClass(task.status)}`}>
            {getStatusText(task.status)}
          </span>
        </td>
        <td>
          <div className="deadline">
            <span className="deadline-check">✅</span>
            {formatDate(task.deadline)}
          </div>
        </td>
        <td>
          <button className="delete-btn" onClick={() => onDelete(task.id)}>🗑️</button>
        </td>
      </tr>
    )
  }

  if (editingField === 'status') {
    return (
      <tr>
        <td>{task.description}</td>
        <td>
          <select
            ref={inputRef}
            className="edit-select"
            value={editValue}
            onChange={(e) => setEditValue(e.target.value)}
            onBlur={saveEdit}
          >
            <option value="active">Активная задача</option>
            <option value="done">Задача выполнена</option>
            <option value="cancelled">Задача отменена</option>
          </select>
        </td>
        <td>
          <div className="deadline">
            <span className="deadline-check">✅</span>
            {formatDate(task.deadline)}
          </div>
        </td>
        <td>
          <button className="delete-btn" onClick={() => onDelete(task.id)}>🗑️</button>
        </td>
      </tr>
    )
  }

  if (editingField === 'deadline') {
    return (
      <tr>
        <td>{task.description}</td>
        <td>
          <span className={`status-badge ${getStatusClass(task.status)}`}>
            {getStatusText(task.status)}
          </span>
        </td>
        <td>
          <input
            ref={inputRef}
            type="date"
            className="edit-input"
            value={editValue}
            onChange={(e) => setEditValue(e.target.value)}
            onBlur={saveEdit}
          />
        </td>
        <td>
          <button className="delete-btn" onClick={() => onDelete(task.id)}>🗑️</button>
        </td>
      </tr>
    )
  }

  return (
    <tr>
      <td onClick={() => startEditing('description', task.description)} style={{ cursor: 'pointer' }}>
        {task.description}
      </td>
      <td onClick={() => startEditing('status', task.status)} style={{ cursor: 'pointer' }}>
        <span className={`status-badge ${getStatusClass(task.status)}`}>
          {getStatusText(task.status)}
        </span>
      </td>
      <td onClick={() => startEditing('deadline', task.deadline)} style={{ cursor: 'pointer' }}>
        <div className="deadline">
          <span className="deadline-check">✅</span>
          {formatDate(task.deadline)}
        </div>
      </td>
      <td>
        <button className="delete-btn" onClick={() => onDelete(task.id)}>🗑️</button>
      </td>
    </tr>
  )
}

export default TodoItem