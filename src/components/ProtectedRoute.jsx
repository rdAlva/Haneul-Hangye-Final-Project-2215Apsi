import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { supabase } from '../db/supabase'

function ProtectedRoute({ children }) {
  const navigate = useNavigate()
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const checkUser = async () => {
      const { data: { session } } = await supabase.auth.getSession()

      if (!session) {
        navigate('/')
      } else {
        setLoading(false)
      }
    }

    checkUser()
  }, [])

  if (loading) return <p>Loading...</p>

  return children
}

export default ProtectedRoute