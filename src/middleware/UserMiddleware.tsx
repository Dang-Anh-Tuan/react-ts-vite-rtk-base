import { FC, ReactNode, useEffect } from 'react'
import { redirect } from 'react-router-dom'
import { useAuth } from '@hooks/auth'
import { useAppDispatch } from '@redux/store'
import { setUser } from '@redux/slices/auth'

interface UserMiddlewareProps {
  children: ReactNode
  needAuth?: boolean
}

const UserMiddleware: FC<UserMiddlewareProps> = ({ children }) => {
  const { token, currentUser, getUser } = useAuth()
  const dispatch = useAppDispatch()

  useEffect(() => {
   async function checkUser() {
    if (!token) {
      redirect('/login')
    } else if (!currentUser) {
      const user = await getUser(token)
      if(!user) redirect('/login')
      dispatch(setUser(user))
    }
   }
   checkUser()
  }, [])

  return <>{children}</>
}

export default UserMiddleware
