import { CaseReducer, PayloadAction, createSlice } from '@reduxjs/toolkit'
import { User } from '@type/user'

interface AuthSliceState {
  user: User | null | undefined
}

const initialState: AuthSliceState = {
  user: null
}

const setUserAction: CaseReducer<AuthSliceState, PayloadAction<User | null | undefined>> = (
  state,
  action
) => {
  state.user = action.payload
}

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setUser: setUserAction
  }
})

const { actions, reducer } = authSlice

export const { setUser } = actions

export default reducer


// delete