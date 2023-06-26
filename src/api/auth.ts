import { AxiosInstance } from 'axios'
import { FormLogin } from '@type/auth'

const AUTH_PREFIX = {
  LOGIN: '/login',
  LOGOUT: '/logout'
}

const apiAuth = (axios: AxiosInstance) => ({
  login(formData: FormLogin) {
    return axios.get(AUTH_PREFIX.LOGIN, {data: formData})
  },

  logout() {
    return axios.post(AUTH_PREFIX.LOGOUT)
  }
})

export default apiAuth


// delete