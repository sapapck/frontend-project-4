import { createSlice } from '@reduxjs/toolkit'

const userData = JSON.parse(localStorage.getItem('userId'))

const initialState = {
  token: userData?.token || null
}

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login: (state, action) => {
      localStorage.setItem('userId', JSON.stringify(action.payload))
      state.token = action.payload.token
    },
    logout: (state) => {
      localStorage.removeItem('userId')
      state.token = null
    }
  }
})

export const { login, logout } = authSlice.actions
export default authSlice.reducer
