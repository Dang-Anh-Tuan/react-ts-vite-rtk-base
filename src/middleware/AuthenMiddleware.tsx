import { useAuth } from '@hooks/auth'
import { FC, ReactNode } from 'react'
import { Navigate } from 'react-router-dom'
interface AuthenMiddlewareProps {
  children: ReactNode
  needAuth?: boolean
}

const AuthenMiddleware: FC<AuthenMiddlewareProps> = ({ children, needAuth }) => {
  const { token } = useAuth()
  const isLoggedIn = !!token

  if (isLoggedIn) {
    if (!needAuth) {
      return <Navigate to='/' />
    }
  } else if (needAuth) {
    return <Navigate to='/login' />
  }

  return children
}

export default AuthenMiddleware
