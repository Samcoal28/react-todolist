import React, { useState, useEffect } from "react"
import { useAuth } from "./context/useAuth"
import { useTheme } from "./context/useTheme"
import AuthPage from "./pages/AuthPage"
import Settings from "./pages/Settings"
import TaskSearch from "./components/TaskSearch"
import TaskCard from "./components/TaskCard"
import AddTaskModal from "./components/AddTaskModal"
import Calendar from "./components/Calendar"
import HeaderMenu from "./components/HeaderMenu"
import EmptyState from "./components/EmptyState"
import FocusMode from "./components/FocusMode"
import "./styles/global.css"
import "./styles/App.css"

function App() {
  const { user, logout, loading } = useAuth()
  const { theme, toggleTheme } = useTheme()
  const [todos, setTodos] = useState(() => {
    if (!user) return []
    const users = JSON.parse(localStorage.getItem('users') || '{}')
    // Normalize legacy string tasks into objects
    const raw = users[user.email]?.todos || []
    return raw.map((t) => (typeof t === 'string' ? { text: t, completed: false } : t))
  })
  
  const [filteredTodos, setFilteredTodos] = useState(todos)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isSettingsOpen, setIsSettingsOpen] = useState(false)
  const [isFocusMode, setIsFocusMode] = useState(false)
  const [showCalendar, setShowCalendar] = useState(false)
  const [selectedDate, setSelectedDate] = useState(null)
  const [draggedItem, setDraggedItem] = useState(null)

  // Update todos when user changes
  if (user) {
    const users = JSON.parse(localStorage.getItem('users') || '{}')
    const userTodosRaw = users[user.email]?.todos || []
    const userTodos = userTodosRaw.map((t) => (typeof t === 'string' ? { text: t, completed: false } : t))
    if (JSON.stringify(userTodos) !== JSON.stringify(todos)) {
      setTodos(userTodos)
      setFilteredTodos(userTodos)
    }
  }

  // (No longer listening for CustomEvent; Settings will call handler via prop)
  // Listen for cross-component clearCompleted event (dispatched from Settings)
  useEffect(() => {
    const handler = () => handleClearCompleted()
    window.addEventListener('clearCompleted', handler)
    return () => window.removeEventListener('clearCompleted', handler)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [todos, user])
  function persistData(newlist) {
    if (!user) return
    const users = JSON.parse(localStorage.getItem('users') || '{}')
    // Persist as-is (objects). Keep backward compatibility for any string entries.
    users[user.email].todos = newlist
    localStorage.setItem('users', JSON.stringify(users))
  }

  function handleAddTodo(task) {
    // Expect `task` to be an object (from AddTaskModal). Normalize if string.
    let newTodo = typeof task === 'string' ? { text: task, completed: false } : { ...task, completed: false }
    if (!newTodo.text || !newTodo.text.trim()) return
    const newTodolist = [...todos, newTodo]
    setTodos(newTodolist)
    setFilteredTodos(newTodolist)
    persistData(newTodolist)
  }
  
  function handleDeleteTodo(todoIndex) {
    const newTodolist = todos.filter((_, index) => index !== todoIndex)
    setTodos(newTodolist)
    setFilteredTodos(newTodolist)
    persistData(newTodolist)  
  }

  function handleEditTodo(todoIndex, updatedTodo) {
    // updatedTodo may be a string from prompt or an object
    if (!updatedTodo) return
    const newTodolist = todos.map((todo, index) => 
      index === todoIndex ? (typeof updatedTodo === 'string' ? { ...todo, text: updatedTodo } : { ...todo, ...updatedTodo }) : todo
    )
    setTodos(newTodolist)
    setFilteredTodos(newTodolist)
    persistData(newTodolist)
  }

  function handleToggleComplete(todoIndex) {
    const newTodolist = todos.map((todo, index) =>
      index === todoIndex ? { ...todo, completed: !todo.completed } : todo
    )
    setTodos(newTodolist)
    setFilteredTodos(newTodolist)
    persistData(newTodolist)
  }

  function handleUpdateSubtasks(todoIndex, updatedSubtasks) {
    const newTodolist = todos.map((todo, index) =>
      index === todoIndex ? { ...todo, subtasks: updatedSubtasks } : todo
    )
    setTodos(newTodolist)
    setFilteredTodos(newTodolist)
    persistData(newTodolist)
  }

  function handleFilter(filtered) {
    setFilteredTodos(filtered)
  }

  function handleReorderTodos(reorderedTodos) {
    setTodos(reorderedTodos)
    setFilteredTodos(reorderedTodos)
    persistData(reorderedTodos)
  }

  function handleExport() {
    const dataToExport = {
      email: user.email,
      exportedAt: new Date().toISOString(),
      tasks: todos,
      totalTasks: todos.length,
    }
    
    const dataStr = JSON.stringify(dataToExport, null, 2)
    const dataBlob = new Blob([dataStr], { type: 'application/json' })
    const url = URL.createObjectURL(dataBlob)
    const link = document.createElement('a')
    link.href = url
    link.download = `tasks-${new Date().toISOString().split('T')[0]}.json`
    link.click()
    URL.revokeObjectURL(url)
  }

  // Clear completed tasks for current user
  function handleClearCompleted() {
    if (!user) return
    const remaining = todos.filter((t) => !t.completed)
    setTodos(remaining)
    setFilteredTodos(remaining)
    persistData(remaining)
  }

  if (loading) {
    return <div className="loading">Loading...</div>
  }

  if (!user) {
    return <AuthPage />
  }

  if (isFocusMode) {
    return <FocusMode todos={todos} onExit={() => setIsFocusMode(false)} />
  }

  return (
    <div data-theme={theme}>
      <header className="app-header">
        <div className="header-content">
          <div className="header-left">
            <h1><i className="fas fa-list-check"></i> Tasks</h1>
          </div>
          <div style={{ flex: 1 }}></div>
          <HeaderMenu
            user={user}
            theme={theme}
            onToggleTheme={toggleTheme}
            onOpenCalendar={() => setShowCalendar(!showCalendar)}
            onOpenFocusMode={() => setIsFocusMode(true)}
            onOpenSettings={() => setIsSettingsOpen(true)}
            onLogout={logout}
            showCalendar={showCalendar}
          />
        </div>
      </header>

      <main className="app-main">
        <div className="app-container">
          {/* Calendar view */}
          {showCalendar && (
            <div className="calendar-wrapper">
              <Calendar 
                todos={todos} 
                onDateSelect={(date) => {
                  setSelectedDate(date)
                  // Optional: auto-filter to show selected date
                }} 
                selectedDate={selectedDate}
              />
            </div>
          )}
          {/* Header with Add button */}
          <div className="app-top">
            <button 
              className="btn-add-task"
              onClick={() => setIsModalOpen(true)}
            >
              <i className="fas fa-plus"></i>
              Add Task
            </button>
          </div>

          {/* Search and filters */}
          <TaskSearch todos={todos} onFilter={handleFilter} />

          {/* Task list */}
          <div className="task-list">
            {filteredTodos.length === 0 ? (
              <EmptyState onAddTask={() => setIsModalOpen(true)} />
            ) : (
              filteredTodos.map((todo, index) => (
                <TaskCard
                  key={index}
                  todo={todo}
                  index={todos.indexOf(todo)}
                  onDelete={handleDeleteTodo}
                  onEdit={handleEditTodo}
                  onToggleComplete={(idx) => handleToggleComplete(idx)}
                  onUpdateSubtasks={handleUpdateSubtasks}
                  onDragStart={(idx) => setDraggedItem(idx)}
                  onDragEnter={(idx) => {
                    if (draggedItem === null || draggedItem === idx) return
                    const newTodos = [...todos]
                    const draggedContent = newTodos[draggedItem]
                    newTodos.splice(draggedItem, 1)
                    newTodos.splice(idx, 0, draggedContent)
                    handleReorderTodos(newTodos)
                    setDraggedItem(idx)
                  }}
                  onDragEnd={() => setDraggedItem(null)}
                  isDragging={draggedItem === todos.indexOf(todo)}
                />
              ))
            )}
          </div>

          {/* Task count */}
          {filteredTodos.length > 0 && (
            <div className="task-stats">
              <small>{filteredTodos.length} {filteredTodos.length === 1 ? 'task' : 'tasks'} remaining</small>
            </div>
          )}
        </div>
      </main>

      {/* Add Task Modal */}
      <AddTaskModal 
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onAdd={handleAddTodo}
      />

      {/* Settings Modal */}
      <Settings 
        isOpen={isSettingsOpen}
        onClose={() => setIsSettingsOpen(false)}
        onExport={handleExport}
        user={user}
        onClearCompleted={handleClearCompleted}
      />
    </div>
  )
}

export default App
