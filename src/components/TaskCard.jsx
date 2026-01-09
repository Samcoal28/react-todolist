import React, { useState, useRef } from 'react'
import Subtasks from './Subtasks'
import '../styles/components/TaskCard.css'

export default function TaskCard({
  todo,
  index,
  onDelete,
  onEdit,
  onToggleComplete,
  onUpdateSubtasks,
  onDragStart,
  onDragEnter,
  onDragEnd,
  isDragging,
}) {
  const completed = typeof todo === 'string' ? false : !!todo.completed
  const [showSubtasks, setShowSubtasks] = useState(false)
  const [swipeX, setSwipeX] = useState(0)
  const touchStartX = useRef(0)
  const cardRef = useRef(null)

  const subtasks = typeof todo === 'string' ? [] : (todo.subtasks || [])
  const reminderTime = typeof todo === 'string' ? null : todo.reminderTime
  const priority = typeof todo === 'string' ? null : todo.priority

  const handleTouchStart = (e) => {
    touchStartX.current = e.touches[0].clientX
  }

  const handleTouchMove = (e) => {
    const currentX = e.touches[0].clientX
    const diff = currentX - touchStartX.current
    
    // Only allow swipe from -100 to 100px
    if (diff > -100 && diff < 100) {
      setSwipeX(diff)
    }
  }

  const handleTouchEnd = () => {
    if (swipeX < -50) {
      // Swiped left - delete
      handleDelete()
    } else if (swipeX > 50) {
      // Swiped right - complete
      handleComplete()
    }
    setSwipeX(0)
  }

  const handleComplete = () => {
    if (onToggleComplete) {
      onToggleComplete(index)
    }
  }

  const handleToggleSubtask = (subtaskIdx) => {
    if (onUpdateSubtasks) {
      const newSubtasks = [...subtasks]
      newSubtasks[subtaskIdx].completed = !newSubtasks[subtaskIdx].completed
      onUpdateSubtasks(index, newSubtasks)
    }
  }

  const handleDeleteSubtask = (subtaskIdx) => {
    if (onUpdateSubtasks) {
      const newSubtasks = subtasks.filter((_, idx) => idx !== subtaskIdx)
      onUpdateSubtasks(index, newSubtasks)
    }
  }

  const handleDelete = () => {
    onDelete(index)
  }

  const handleEdit = () => {
    const currentText = typeof todo === 'string' ? todo : (todo.text || '')
    const updated = window.prompt('Edit task:', currentText)
    if (updated !== null) {
      onEdit(index, updated)
    }
  }

  return (
    <div
      ref={cardRef}
      className={`task-card ${completed ? 'completed' : ''} ${isDragging ? 'dragging' : ''}`}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
      draggable
      onDragStart={() => onDragStart && onDragStart(index)}
      onDragEnter={() => onDragEnter && onDragEnter(index)}
      onDragEnd={onDragEnd}
      onDragOver={(e) => e.preventDefault()}
      style={{
        transform: `translateX(${swipeX}px)`,
        opacity: 1 - Math.abs(swipeX) / 100,
      }}
    >
      {/* Drag handle */}
      <div className="task-drag-handle">
        <i className="fas fa-bars"></i>
      </div>

      {/* Swipe indicators */}
      <div className="task-swipe-hint task-swipe-hint--left">
        <i className="fas fa-trash-alt"></i>
      </div>
      <div className="task-swipe-hint task-swipe-hint--right">
        <i className="fas fa-check"></i>
      </div>

      {/* Main content */}
      <div className="task-checkbox">
        <button
          className="task-check-btn"
          onClick={handleComplete}
          aria-label="Mark task complete"
        >
          {completed ? <i className="fas fa-check"></i> : ''}
        </button>
      </div>

      <div className="task-content">
        <div className="task-header">
          <p className={`task-text ${completed ? 'task-text--completed' : ''}`}>
            {typeof todo === 'string' ? todo : todo.text}
          </p>
          {priority && <span className={`task-priority priority-${priority}`}>{priority}</span>}
        </div>
        
        {reminderTime && (
          <div className="task-reminder">
            <i className="fas fa-clock"></i>
            <span>{reminderTime}</span>
          </div>
        )}

        {subtasks && subtasks.length > 0 && (
          <>
            <button 
              className="task-subtasks-toggle"
              onClick={() => setShowSubtasks(!showSubtasks)}
            >
              <i className={`fas fa-chevron-${showSubtasks ? 'up' : 'down'}`}></i>
              Subtasks ({subtasks.filter(s => s.completed).length}/{subtasks.length})
            </button>
            {showSubtasks && (
              <Subtasks
                subtasks={subtasks}
                onToggleSubtask={handleToggleSubtask}
                onDeleteSubtask={handleDeleteSubtask}
              />
            )}
          </>
        )}
      </div>

      <div className="task-actions">
        <button
          className="task-action-btn task-action-btn--edit"
          onClick={handleEdit}
          title="Edit task"
        >
          <i className="fas fa-edit"></i>
        </button>
        <button
          className="task-action-btn task-action-btn--delete"
          onClick={handleDelete}
          title="Delete task"
        >
          <i className="fas fa-trash-alt"></i>
        </button>
      </div>
    </div>
  )
}
