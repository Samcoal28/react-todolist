import React, { useState, useEffect } from 'react'
import '../styles/components/TaskSearch.css'

export default function TaskSearch({ todos, onFilter }) {
  const [searchTerm, setSearchTerm] = useState('')
  const [filterType, setFilterType] = useState('all')

  const handleSearch = (e) => {
    const term = e.target.value
    setSearchTerm(term)
    filterTasks(term, filterType)
  }

  const handleFilterChange = (type) => {
    setFilterType(type)
    filterTasks(searchTerm, type)
  }

  // Re-run filtering when todos or filterType change
  useEffect(() => {
    filterTasks(searchTerm, filterType)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [todos])

  const filterTasks = (search, type = filterType) => {
    let filtered = todos || []

    // Search filter
    if (search) {
      filtered = filtered.filter((task) => {
        const text = typeof task === 'string' ? task : (task.text || '')
        return text.toLowerCase().includes(search.toLowerCase())
      })
    }

    // Status filters
    if (type === 'active') {
      filtered = filtered.filter((task) => (typeof task === 'string' ? true : !task.completed))
    } else if (type === 'completed') {
      filtered = filtered.filter((task) => (typeof task === 'string' ? false : !!task.completed))
    } else if (type === 'today') {
      const today = new Date().toISOString().split('T')[0]
      filtered = filtered.filter((task) => {
        if (typeof task === 'string') return false
        if (!task.dueDate) return false
        return task.dueDate === today
      })
    }

    onFilter(filtered)
  }

  return (
    <div className="task-search-container">
      <div className="search-input-wrapper">
        <i className="fas fa-search"></i>
        <input
          type="text"
          placeholder="Search tasks..."
          value={searchTerm}
          onChange={handleSearch}
          className="search-input"
        />
        {searchTerm && (
          <button
            className="search-clear"
            onClick={() => {
              setSearchTerm('')
              filterTasks('', filterType)
            }}
          >
            <i className="fas fa-times"></i>
          </button>
        )}
      </div>

      <div className="filters">
        <button
          className={`filter-btn ${filterType === 'all' ? 'active' : ''}`}
          onClick={() => handleFilterChange('all')}
        >
          All
        </button>
        <button
          className={`filter-btn ${filterType === 'active' ? 'active' : ''}`}
          onClick={() => handleFilterChange('active')}
        >
          Active
        </button>
        <button
          className={`filter-btn ${filterType === 'today' ? 'active' : ''}`}
          onClick={() => handleFilterChange('today')}
        >
          Today
        </button>
        <button
          className={`filter-btn ${filterType === 'completed' ? 'active' : ''}`}
          onClick={() => handleFilterChange('completed')}
        >
          Completed
        </button>
      </div>
    </div>
  )
}
