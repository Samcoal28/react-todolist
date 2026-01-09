import React, { useState } from 'react'
import { useTheme } from '../context/useTheme'
import '../styles/pages/Settings.css'

export default function Settings({ isOpen, onClose, onExport, user }) {
  const { theme, toggleTheme } = useTheme()
  const [exportSuccess, setExportSuccess] = useState(false)
  const [clearSuccess, setClearSuccess] = useState(false)

  const handleExport = () => {
    onExport()
    setExportSuccess(true)
    setTimeout(() => setExportSuccess(false), 2000)
  }

  if (!isOpen) return null

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2>Settings</h2>
          <button className="modal-close" onClick={onClose}>
            <i className="fas fa-times"></i>
          </button>
        </div>

        <div className="settings-content">
          {/* Theme Setting */}
          <div className="settings-section">
            <h3>Appearance</h3>
            <div className="setting-item">
              <div className="setting-info">
                <label>Dark Mode</label>
                <small>Reduce eye strain in low light</small>
              </div>
              <button 
                className={`toggle-switch ${theme === 'dark' ? 'active' : ''}`}
                onClick={toggleTheme}
              >
                <span className="toggle-knob"></span>
              </button>
            </div>
          </div>

          {/* Data Section */}
          <div className="settings-section">
            <h3>Data & Privacy</h3>
            
            <div className="setting-item">
              <div className="setting-info">
                <label>Current User</label>
                <small className="user-email-display">{user?.email}</small>
              </div>
            </div>

            <div className="setting-item">
              <div className="setting-info">
                <label>Export Data</label>
                <small>Download your tasks as JSON</small>
              </div>
              <button 
                className={`btn-export ${exportSuccess ? 'success' : ''}`}
                onClick={handleExport}
              >
                {exportSuccess ? (
                  <>
                    <i className="fas fa-check"></i>
                    Exported!
                  </>
                ) : (
                  <>
                    <i className="fas fa-download"></i>
                    Export
                  </>
                )}
              </button>
            </div>

            <div className="setting-item warning">
              <div className="setting-info">
                <label>Clear Local Data</label>
                <small>This cannot be undone</small>
              </div>
              <button className="btn-danger" onClick={() => {
                if (window.confirm('Clear ALL local data for this app? This cannot be undone.')) {
                  // remove all users (keeps the app clean)
                  localStorage.removeItem('users')
                  localStorage.removeItem('currentUser')
                  setClearSuccess(true)
                  setTimeout(() => setClearSuccess(false), 2000)
                }
              }}>
                Clear
              </button>
            </div>

            <div className="setting-item">
              <div className="setting-info">
                <label>Clear Completed Tasks</label>
                <small>Remove tasks marked completed for current user</small>
              </div>
              <button className={`btn-clear-completed ${clearSuccess ? 'success' : ''}`} onClick={() => {
                if (window.confirm('Remove all completed tasks for this user?')) {
                  if (typeof window !== 'undefined' && window.localStorage) {
                    const evt = new CustomEvent('clearCompleted')
                    window.dispatchEvent(evt)
                    setClearSuccess(true)
                    setTimeout(() => setClearSuccess(false), 1500)
                  }
                }
              }}>
                {clearSuccess ? (
                  <><i className="fas fa-check"></i> Cleared</>
                ) : (
                  <><i className="fas fa-broom"></i> Clear</>
                )}
              </button>
            </div>
          </div>

          {/* About Section */}
          <div className="settings-section">
            <h3>About</h3>
            <div className="setting-item">
              <div className="setting-info">
                <label>Version</label>
                <small>1.0.0 - Redesigned Edition</small>
              </div>
            </div>
            <div className="setting-item">
              <p className="settings-desc">
                <i className="fas fa-lightbulb"></i> <strong>Pro Tip:</strong> Your tasks are saved locally on this device. They sync automatically across sessions.
              </p>
            </div>
          </div>
        </div>

        <div className="modal-footer">
          <button className="btn btn-primary" onClick={onClose}>
            Done
          </button>
        </div>
      </div>
    </div>
  )
}
