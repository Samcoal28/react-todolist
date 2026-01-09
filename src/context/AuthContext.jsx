import { useState } from 'react'
import { AuthContext } from './AuthContextCreate'

function initializeAuth() {
  const storedUser = localStorage.getItem('currentUser')
  let user = null
  if (storedUser) {
    try {
      user = JSON.parse(storedUser)
    } catch (e) {
      console.error('Failed to parse stored user:', e)
    }
  }
  return { user, loading: false }
}

export function AuthProvider({ children }) {
  const [authState, setAuthState] = useState(() => initializeAuth())

  const signup = (email, password) => {
    // Check if user already exists
    const users = JSON.parse(localStorage.getItem('users') || '{}')
    
    if (users[email]) {
      throw new Error('User already exists')
    }

    // Create new user
    users[email] = {
      email,
      password, // In production, this would be hashed!
      todos: [
        'Learn React',
        'Build a Todo App',
        'Master JavaScript'
      ]
    }

    localStorage.setItem('users', JSON.stringify(users))
    const userData = { email }
    setAuthState({ user: userData, loading: false })
    localStorage.setItem('currentUser', JSON.stringify(userData))
    
    return userData
  }

  const login = (email, password) => {
    const users = JSON.parse(localStorage.getItem('users') || '{}')
    
    if (!users[email]) {
      throw new Error('User not found')
    }

    if (users[email].password !== password) {
      throw new Error('Invalid password')
    }

    const userData = { email }
    setAuthState({ user: userData, loading: false })
    localStorage.setItem('currentUser', JSON.stringify(userData))
    
    return userData
  }

  const logout = () => {
    setAuthState({ user: null, loading: false })
    localStorage.removeItem('currentUser')
  }

  const value = {
    user: authState.user,
    loading: authState.loading,
    signup,
    login,
    logout
  }

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  )
}
