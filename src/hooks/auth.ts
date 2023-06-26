import { getCookie, setCookie, removeCookie } from 'typescript-cookie'
import {
  Location,
  NavigateFunction,
  useLocation,
  useNavigate
} from 'react-router-dom'
import { commonInstance, factories } from '@plugin/axios'
import { useAppDispatch, useAppSelector } from '@redux/store'
import { FormLogin } from '@type/auth'
import { setUser } from '@redux/slices/auth'
import { User } from '@type/user'

export const useAuth = function (data?: { formData: FormLogin }) {
  const formData: FormLogin | null = data?.formData || null
  const navigate: NavigateFunction = useNavigate()
  const dispatch = useAppDispatch()
  const location: Location = useLocation()
  const queryParams: URLSearchParams = new URLSearchParams(location.search)
  const redirectPage: string = queryParams.get('redirectPage') ?? '/'

  const token: string | undefined = getCookie('access_token')
  let currentUser: User | null | undefined = useAppSelector(
    (state) => state.auth.user
  )

  function cookieRemoveAuthInfo() {
    removeCookie('access_token')
    removeCookie('refresh_token')
    dispatch(setUser(null))
  }

  async function getUser(token: string) {
    try {
      const respFetchUser = await factories.user.getUser(token)
      const user: User = respFetchUser?.data
      dispatch(setUser(user))
      return user
    } catch (error: any) {
      cookieRemoveAuthInfo()
      // TODO : show toast message
      // TODO : redirect to login page
    }
  }

  async function login() {
    if (formData) {
      const response = await factories.auth.login({
        username: formData.username,
        password: formData.password
      })
      if (response?.status === 200 || response?.status === 201) {
        const token = response?.data?.access_token
        const refreshToken = response?.data?.refresh_token
        setCookie('access_token', token)
        setCookie('refresh_token', refreshToken)

        commonInstance.defaults.headers.common[
          'Authorization'
        ] = `Bearer ${token}`

        await getUser(token)
        navigate(redirectPage)
      } else {
        // TODO : show toast error
      }
    }
  }

  function logout() {
    // TODO : Call API logout
    cookieRemoveAuthInfo()
    navigate('/login')
  }

  return {
    token,
    currentUser,
    getUser,
    login,
    logout
  }
}
