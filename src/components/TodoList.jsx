import TodoItem from './TodoItem'

const TodoList = ({ tasks, onDelete, onUpdate }) => {
  return (
    <table className="todo-table">
      <thead>
        <tr>
          <th>Описание</th>
          <th>Статус</th>
          <th>Дедлайн</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        {tasks.map(task => (
          <TodoItem 
            key={task.id}
            task={task}
            onDelete={onDelete}
            onUpdate={onUpdate}
          />
        ))}
      </tbody>
    </table>
  )
}

export default TodoList