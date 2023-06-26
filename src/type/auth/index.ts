export interface FormLogin {
  username: string
  password: string
}

export interface ResponseLogin {
  access_token: string
  token_type: string
  expires_in: number
  refresh_token: string
  scope: string
}
