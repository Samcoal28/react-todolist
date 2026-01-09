import React, { useState } from 'react'
import { useAuth } from '../context/useAuth'
import '../styles/AuthPage.css'

export default function AuthPage() {
  const [isSignUp, setIsSignUp] = useState(false)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [error, setError] = useState('')
  const { signup, login } = useAuth()

  const handleSubmit = (e) => {
    e.preventDefault()
    setError('')

    try {
      if (isSignUp) {
        if (password !== confirmPassword) {
          setError('Passwords do not match')
          return
        }
        if (password.length < 4) {
          setError('Password must be at least 4 characters')
          return
        }
        signup(email, password)
      } else {
        login(email, password)
      }
    } catch (err) {
      setError(err.message)
    }
  }

  return (
    <div className='auth-container'>
      <div className='auth-box'>
        <h1>{isSignUp ? 'Create Account' : 'Welcome Back'}</h1>
        
        {error && <div className='error-message'>{error}</div>}
        
        <form onSubmit={handleSubmit}>
          <div className='form-group'>
            <label>Email</label>
            <input
              type='email'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder='Enter your email'
              required
            />
          </div>

          <div className='form-group'>
            <label>Password</label>
            <input
              type='password'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder='Enter your password'
              required
            />
          </div>

          {isSignUp && (
            <div className='form-group'>
              <label>Confirm Password</label>
              <input
                type='password'
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder='Confirm your password'
                required
              />
            </div>
          )}

          <button type='submit' className='auth-button'>
            {isSignUp ? 'Sign Up' : 'Sign In'}
          </button>
        </form>

        <p className='toggle-auth'>
          {isSignUp ? "Already have an account? " : "Don't have an account? "}
          <button
            type='button'
            onClick={() => {
              setIsSignUp(!isSignUp)
              setError('')
              setEmail('')
              setPassword('')
              setConfirmPassword('')
            }}
          >
            {isSignUp ? 'Sign In' : 'Sign Up'}
          </button>
        </p>
      </div>
    </div>
  )
}
