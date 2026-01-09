import React, { useState, useRef, useEffect } from 'react'
import '../styles/components/HeaderMenu.css'

export default function HeaderMenu({ 
  user, 
  theme, 
  onToggleTheme, 
  onOpenCalendar, 
  onOpenFocusMode, 
  onOpenSettings, 
  onLogout,
  showCalendar 
}) {
  const [isOpen, setIsOpen] = useState(false)
  const menuRef = useRef(null)

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setIsOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const handleMenuItemClick = (action) => {
    action()
    setIsOpen(false)
  }

  return (
    <div className="header-menu-wrapper" ref={menuRef}>
      <div className="header-actions">
        <button 
          className="theme-toggle"
          onClick={onToggleTheme}
          title="Toggle dark mode"
        >
          {theme === 'light' ? <i className="fas fa-moon"></i> : <i className="fas fa-sun"></i>}
        </button>

        <button 
          className={`menu-trigger ${isOpen ? 'active' : ''}`}
          onClick={() => setIsOpen(!isOpen)}
          title="More options"
          aria-label="Menu"
          aria-expanded={isOpen}
        >
          <i className="fas fa-ellipsis-v"></i>
        </button>
      </div>

      {isOpen && (
        <div className="header-menu">
          <button 
            className="menu-item"
            onClick={() => handleMenuItemClick(onOpenCalendar)}
          >
            <i className="fas fa-calendar"></i>
            <span>Calendar</span>
            {showCalendar && <i className="fas fa-check menu-item-check"></i>}
          </button>

          <button 
            className="menu-item"
            onClick={() => handleMenuItemClick(onOpenFocusMode)}
          >
            <i className="fas fa-bullseye"></i>
            <span>Focus Mode</span>
          </button>

          <button 
            className="menu-item"
            onClick={() => handleMenuItemClick(onOpenSettings)}
          >
            <i className="fas fa-cog"></i>
            <span>Settings</span>
          </button>

          <div className="menu-divider"></div>

          <div className="menu-user">
            <i className="fas fa-user"></i>
            <span className="user-email-menu">{user?.email}</span>
          </div>

          <button 
            className="menu-item menu-item--danger"
            onClick={() => handleMenuItemClick(onLogout)}
          >
            <i className="fas fa-sign-out-alt"></i>
            <span>Logout</span>
          </button>
        </div>
      )}
    </div>
  )
}
