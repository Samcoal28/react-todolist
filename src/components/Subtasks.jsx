import React from 'react'
import '../styles/components/Subtasks.css'

export default function Subtasks({ subtasks, onToggleSubtask, onDeleteSubtask }) {
  const completed = subtasks ? subtasks.filter((s) => s.completed).length : 0
  const total = subtasks ? subtasks.length : 0

  if (!subtasks || subtasks.length === 0) {
    return null
  }

  return (
    <div className="subtasks-container">
      <div className="subtasks-header">
        <span className="subtasks-progress">
          <i className="fas fa-list-check"></i> {completed}/{total}
        </span>
        <div className="subtasks-bar">
          <div className="subtasks-progress-bar" style={{ width: `${total > 0 ? (completed / total) * 100 : 0}%` }}></div>
        </div>
      </div>

      <div className="subtasks-list">
        {subtasks.map((subtask, idx) => (
          <div key={idx} className={`subtask-item ${subtask.completed ? 'completed' : ''}`}>
            <button
              className="subtask-check"
              onClick={() => onToggleSubtask && onToggleSubtask(idx)}
              title="Mark subtask complete"
            >
              {subtask.completed ? <i className="fas fa-check"></i> : ''}
            </button>
            <span className="subtask-text">{subtask.text}</span>
            <button
              className="subtask-delete"
              onClick={() => onDeleteSubtask && onDeleteSubtask(idx)}
              title="Delete subtask"
            >
              <i className="fas fa-trash-alt"></i>
            </button>
          </div>
        ))}
      </div>
    </div>
  )
}
