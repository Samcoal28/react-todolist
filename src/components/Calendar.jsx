import React, { useState } from 'react'
import '../styles/components/Calendar.css'

export default function Calendar({ todos, onDateSelect, selectedDate }) {
  const [currentMonth, setCurrentMonth] = useState(new Date())
  
  const getDaysInMonth = (date) => {
    return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate()
  }
  
  const getFirstDayOfMonth = (date) => {
    return new Date(date.getFullYear(), date.getMonth(), 1).getDay()
  }
  
  const getTasksForDate = (date) => {
    const dateStr = date.toISOString().split('T')[0]
    return todos.filter((task) => {
      const taskDate = typeof task === 'string' ? null : task.dueDate
      return taskDate === dateStr
    })
  }
  
  const getCompletedForDate = (date) => {
    return getTasksForDate(date).filter((t) => !t.completed).length === 0 && getTasksForDate(date).length > 0
  }
  
  const handlePrevMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1))
  }
  
  const handleNextMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1))
  }
  
  const handleDateClick = (day) => {
    const date = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), day)
    onDateSelect(date.toISOString().split('T')[0])
  }
  
  const monthName = currentMonth.toLocaleString('default', { month: 'long', year: 'numeric' })
  const daysInMonth = getDaysInMonth(currentMonth)
  const firstDay = getFirstDayOfMonth(currentMonth)
  const days = Array.from({ length: daysInMonth }, (_, i) => i + 1)
  const blanks = Array.from({ length: firstDay }, (_, i) => i)
  
  const isToday = (day) => {
    const today = new Date()
    return day === today.getDate() && 
           currentMonth.getMonth() === today.getMonth() &&
           currentMonth.getFullYear() === today.getFullYear()
  }
  
  const isSelected = (day) => {
    if (!selectedDate) return false
    const [year, month, date] = selectedDate.split('-')
    return parseInt(date) === day && 
           parseInt(month) - 1 === currentMonth.getMonth() &&
           parseInt(year) === currentMonth.getFullYear()
  }

  return (
    <div className="calendar-container">
      <div className="calendar-header">
        <button className="calendar-nav-btn" onClick={handlePrevMonth}>
          <i className="fas fa-chevron-left"></i>
        </button>
        <h3 className="calendar-month">{monthName}</h3>
        <button className="calendar-nav-btn" onClick={handleNextMonth}>
          <i className="fas fa-chevron-right"></i>
        </button>
      </div>
      
      <div className="calendar-weekdays">
        {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day) => (
          <div key={day} className="weekday-label">
            {day}
          </div>
        ))}
      </div>
      
      <div className="calendar-days">
        {blanks.map((_, i) => (
          <div key={`blank-${i}`} className="calendar-day blank"></div>
        ))}
        {days.map((day) => {
          const tasksForDay = getTasksForDate(new Date(currentMonth.getFullYear(), currentMonth.getMonth(), day))
          const allCompleted = getCompletedForDate(new Date(currentMonth.getFullYear(), currentMonth.getMonth(), day))
          
          return (
            <div
              key={day}
              className={`calendar-day ${isToday(day) ? 'today' : ''} ${isSelected(day) ? 'selected' : ''} ${tasksForDay.length > 0 ? 'has-tasks' : ''} ${allCompleted ? 'all-completed' : ''}`}
              onClick={() => handleDateClick(day)}
            >
              <div className="day-number">{day}</div>
              {tasksForDay.length > 0 && (
                <div className="task-indicator">
                  <span className="task-count">{tasksForDay.length}</span>
                </div>
              )}
            </div>
          )
        })}
      </div>
    </div>
  )
}
