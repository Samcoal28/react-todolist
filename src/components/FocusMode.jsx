import React from 'react'
import '../styles/components/FocusMode.css'

export default function FocusMode({ todos, onExit }) {
  const todaysTasks = todos.filter(todo => {
    const today = new Date().toISOString().split('T')[0]
    return todo.includes(today) || (!todo.includes('(Due:') && todo.length > 0)
  })

  return (
    <div className="focus-mode">
      <div className="focus-header">
        <h1><i className="fas fa-bullseye"></i> Focus Mode</h1>
        <button className="focus-close" onClick={onExit}>
          <i className="fas fa-times"></i>
        </button>
      </div>

      <div className="focus-content">
        <div className="focus-greeting">
          <h2>Let's get things done!</h2>
          <p className="focus-subtitle">
            {todaysTasks.length} task{todaysTasks.length !== 1 ? 's' : ''} for today
          </p>
        </div>

        <div className="focus-tasks">
          {todaysTasks.length > 0 ? (
            todaysTasks.map((todo, idx) => (
              <div key={idx} className="focus-task-item">
                <div className="focus-task-check">
                  <button className="focus-checkbox">
                    <i className="fas fa-circle"></i>
                  </button>
                </div>
                <div className="focus-task-text">
                  <p>{todo}</p>
                </div>
              </div>
            ))
          ) : (
            <div className="focus-empty">
              <i className="fas fa-check-circle"></i>
              <p>No tasks for today. Time to relax! 🎉</p>
            </div>
          )}
        </div>

        <div className="focus-tips">
          <h3><i className="fas fa-lightbulb"></i> Focus Tips</h3>
          <ul>
            <li>Start with the most important task</li>
            <li>Break big tasks into smaller ones</li>
            <li>Take a 5-minute break every 25 minutes</li>
            <li>Celebrate small wins</li>
          </ul>
        </div>
      </div>
    </div>
  )
}
