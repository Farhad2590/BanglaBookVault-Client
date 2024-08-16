import useAuth from '../hooks/useAuth'
import { Navigate, useLocation } from 'react-router-dom'



const PrivateRoute = ({ children }) => {
  const { user, loading } = useAuth()
  const location = useLocation()

  if (loading) return <span className="loading loading-spinner loading-lg"></span>
  if (user) return children
  return <Navigate to='/signin' state={location.pathname} replace='true' />
}

export default PrivateRoute