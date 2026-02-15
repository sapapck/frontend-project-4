import { createSlice } from '@reduxjs/toolkit'

// Начальное значение
const userData = JSON.parse(localStorage.getItem('userId')); // Поменяем ключ на более логичный

const initialState = {
  token: userData?.token || null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login: (state, action) => {
      state.token = action.payload.token;
    },
    logout: (state) => {
      localStorage.removeItem('userId');
      state.token = null;
    }
  },
});

export const {login, logout} = authSlice.actions;
export default authSlice.reducer;

