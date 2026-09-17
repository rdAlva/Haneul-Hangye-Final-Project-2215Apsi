import { useState } from 'react'
import { supabase } from '../db/supabase'
import { Link } from 'react-router-dom'

function ForgotPassword() {
  const [email, setEmail] = useState('')
  const [message, setMessage] = useState(null)
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(false)

  const handleReset = async () => {
    setLoading(true)
    setError(null)
    setMessage(null)

    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: 'http://localhost:5173/reset-password'
    })

    if (error) {
      setError(error.message)
    } else {
      setMessage('Check your email for the reset link!')
    }
    setLoading(false)
  }

  return (
    <div className="auth-container">
      <h1>Reset your Password</h1>
      <p>Enter your email and we'll send you a reset link</p>

      {error && <p className="error">{error}</p>}
      {message && <p className="success">{message}</p>}

      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />

      <button onClick={handleReset} disabled={loading}>
        {loading ? 'Sending...' : 'Send Reset Link'}
      </button>

      <p>Remember your password? <Link to="/">Log in</Link></p>
    </div>
  )
}

export default ForgotPassword