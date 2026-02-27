const FilterButtons = ({ currentFilter, onFilterChange }) => {
  return (
    <div className="filter-buttons">
      <button 
        className={`filter-button ${currentFilter === 'all' ? 'active' : ''}`}
        onClick={() => onFilterChange('all')}
      >
        Все задачи
      </button>
      <button 
        className={`filter-button ${currentFilter === 'active' ? 'active' : ''}`}
        onClick={() => onFilterChange('active')}
      >
        Активные задачи
      </button>
      <button 
        className={`filter-button ${currentFilter === 'completed' ? 'active' : ''}`}
        onClick={() => onFilterChange('completed')}
      >
        Завершенные задачи
      </button>
    </div>
  )
}

export default FilterButtons