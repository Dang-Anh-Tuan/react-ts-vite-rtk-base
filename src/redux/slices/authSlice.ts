import { CaseReducer, PayloadAction, createSlice } from '@reduxjs/toolkit'
import { User } from '@type/user'

export interface AuthSliceState {
  user: User | null | undefined
  token: string | null | undefined
}

const initialState: AuthSliceState = {
  user: null,
  token: null
}

const setUserAction: CaseReducer<
  AuthSliceState,
  PayloadAction<User | null | undefined>
> = (state, action) => {
  state.user = action.payload
}

const setCredentialsAction: CaseReducer<
  AuthSliceState,
  PayloadAction<AuthSliceState>
> = (state, action) => {
  const { user, token } = action.payload
  state.user = user
  state.token = token
}

const logoutAction: CaseReducer<AuthSliceState> = (state, action) => {
  state.user = null
  state.token = null
}

export const authSlice = createSlice({
  name: 'authSlice',
  initialState,
  reducers: {
    setUser: setUserAction,
    setCredentials: setCredentialsAction,
    logout: logoutAction
  }
})

const { actions, reducer } = authSlice

export const { setUser, setCredentials, logout } = actions

export default reducer
