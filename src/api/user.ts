import { AxiosInstance } from 'axios'

const USER_PREFIX = {
  USER: '/user'
}

const apiUser = (axios: AxiosInstance) => ({
  getUser(id: string) {
    return axios.get(`${USER_PREFIX.USER}/${id}`)
  }
})

export default apiUser


// delete