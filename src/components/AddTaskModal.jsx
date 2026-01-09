import React, { useState } from 'react'
import '../styles/components/AddTaskModal.css'

export default function AddTaskModal({ isOpen, onClose, onAdd }) {
  const [taskInput, setTaskInput] = useState('')
  const [priority, setPriority] = useState('medium')
  const [dueDate, setDueDate] = useState('')
  const [reminderTime, setReminderTime] = useState('')
  const [subtasksInput, setSubtasksInput] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!taskInput.trim()) return

    const task = {
      text: taskInput,
      priority,
      dueDate,
      reminderTime,
      subtasks: subtasksInput
        .split('\n')
        .map((s) => s.trim())
        .filter((s) => s.length > 0)
        .map((text) => ({ text, completed: false })),
      createdAt: new Date().toISOString(),
    }

    onAdd(task)
    setTaskInput('')
    setPriority('medium')
    setDueDate('')
    setReminderTime('')
    setSubtasksInput('')
    onClose()
  }

  if (!isOpen) return null

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2>Add New Task</h2>
          <button className="modal-close" onClick={onClose}>
            <i className="fas fa-times"></i>
          </button>
        </div>

        <form onSubmit={handleSubmit} className="modal-form">
          <div className="form-group">
            <label>Task description</label>
            <textarea
              value={taskInput}
              onChange={(e) => setTaskInput(e.target.value)}
              placeholder="What do you need to do?
e.g., Pay rent tomorrow at 9am"
              autoFocus
            />
            <small className="form-hint">
              <i className="fas fa-lightbulb"></i> Tip: Use natural language like "tomorrow at 9am" for due dates
            </small>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>Priority</label>
              <select value={priority} onChange={(e) => setPriority(e.target.value)}>
                <option value="low">Low</option>
                <option value="medium">Medium</option>
                <option value="high">High</option>
              </select>
            </div>

            <div className="form-group">
              <label>Due date</label>
              <input
                type="date"
                value={dueDate}
                onChange={(e) => setDueDate(e.target.value)}
              />
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>Reminder</label>
              <input
                type="time"
                value={reminderTime}
                onChange={(e) => setReminderTime(e.target.value)}
              />
            </div>
          </div>

          <div className="form-group">
            <label>Subtasks (one per line)</label>
            <textarea
              value={subtasksInput}
              onChange={(e) => setSubtasksInput(e.target.value)}
              placeholder="Add subtasks to break down the main task
e.g.,
- Research options
- Compare prices
- Make purchase"
              rows="4"
            />
          </div>

          <div className="modal-actions">
            <button type="button" className="btn btn-secondary" onClick={onClose}>
              Cancel
            </button>
            <button type="submit" className="btn btn-primary">
              <i className="fas fa-plus"></i>
              Add Task
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
