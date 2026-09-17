import { Link, useNavigate } from 'react-router-dom'
import { supabase } from '../db/supabase'
import './NavBar.css'
import logo from '../assets/logo.png'

function NavBar() {
  const navigate = useNavigate()

  const handleLogout = async () => {
    await supabase.auth.signOut()
    navigate('/')
  }

  return (
    <nav className="navbar">
      <div className="logo">
        <img className="logo-img" src={logo} alt="Haneul Hangye" />
      </div>

      <div className="nav-links">
      <ul>
        <li><Link to="/dashboard">Dashboard</Link></li>
        <li><Link to="/sessions">Sessions</Link></li>
        <li><Link to="/vocabulary">Vocabulary</Link></li>
      </ul>

      <button onClick={handleLogout}>Logout</button>
      </div>
    </nav>
  )
}

export default NavBar