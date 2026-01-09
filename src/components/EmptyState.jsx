import React from 'react'
import '../styles/components/EmptyState.css'

export default function EmptyState({ onAddTask }) {
  return (
    <div className="empty-state">
      <div className="empty-state-icon">
        <i className="fas fa-inbox"></i>
      </div>
      <h3>All caught up! 🎉</h3>
      <p>You've completed all your tasks. Time to celebrate or add new ones!</p>
      <button className="btn-empty-add" onClick={onAddTask}>
        <i className="fas fa-plus"></i>
        Add Your First Task
      </button>
    </div>
  )
}
