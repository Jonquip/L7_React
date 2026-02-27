import { useState } from 'react'

const AddTodoModal = ({ isOpen, onClose, onAdd }) => {
  const [formData, setFormData] = useState({
    description: '',
    status: 'active',
    deadline: ''
  })
  const [errors, setErrors] = useState({})

  if (!isOpen) return null

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData({ ...formData, [name]: value })
    if (errors[name]) {
      setErrors({ ...errors, [name]: null })
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    
    const newErrors = {}
    if (!formData.description.trim()) {
      newErrors.description = 'Описание обязательно'
    }
    if (!formData.deadline) {
      newErrors.deadline = 'Укажите дедлайн'
    }
    
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors)
      return
    }

    onAdd({
      ...formData,
      id: Date.now(),
      description: formData.description
    })
    
    setFormData({
      description: '',
      status: 'active',
      deadline: ''
    })
    setErrors({})
  }

  // Форматируем дату для input type="date" (YYYY-MM-DD)
  const today = new Date().toISOString().split('T')[0]

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        <h2>Добавить новую задачу</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Описание</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="Введите описание"
              className={errors.description ? 'error' : ''}
            />
            {errors.description && (
              <div className="error-message">{errors.description}</div>
            )}
          </div>

          <div className="form-group">
            <label>Статус</label>
            <select name="status" value={formData.status} onChange={handleChange}>
              <option value="active">Активная задача</option>
              <option value="done">Задача выполнена</option>
              <option value="cancelled">Задача отменена</option>
            </select>
            <div className="field-hint">Выберите статус задачи</div>
          </div>

          <div className="form-group">
            <label>Дедлайн</label>
            <input
              type="date"
              name="deadline"
              value={formData.deadline}
              onChange={handleChange}
              min={today}
              className={errors.deadline ? 'error' : ''}
            />
            {errors.deadline && (
              <div className="error-message">{errors.deadline}</div>
            )}
            <div className="field-hint">Укажите дату выполнения</div>
          </div>

          <div className="modal-actions">
            <button type="button" onClick={onClose}>Отмена</button>
            <button type="submit">Добавить задачу</button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default AddTodoModal