const FilterButtons = ({ currentFilter, onFilterChange }) => {
  return (
    <div className="filters">
      <button 
        className={`filter-btn ${currentFilter === 'all' ? 'active' : ''}`}
        onClick={() => onFilterChange('all')}
      >
        Все задачи
      </button>
      <button 
        className={`filter-btn ${currentFilter === 'active' ? 'active' : ''}`}
        onClick={() => onFilterChange('active')}
      >
        Активные задачи
      </button>
      <button 
        className={`filter-btn ${currentFilter === 'completed' ? 'active' : ''}`}
        onClick={() => onFilterChange('completed')}
      >
        Завершенные задачи
      </button>
    </div>
  )
}

export default FilterButtons