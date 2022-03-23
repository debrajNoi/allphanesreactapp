// import { useEffect } from 'react'
import { Navigate, Outlet } from 'react-router-dom'
import useAuth from '../Hooks/useAuth'

function PrivateOutlet() {
  const auth = useAuth()
  console.log("auth", auth)
  

  return auth ? <Navigate to="/profile" /> : <Navigate to="/login" />
}

export default PrivateOutlet