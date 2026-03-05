import { configureStore } from '@reduxjs/toolkit'
import { chatApi } from './api/chatApi'
import authReducer from './authSlice'
import uiReducer from './uiSlice'

export default configureStore({
  reducer: {
    [chatApi.reducerPath]: chatApi.reducer,
    auth: authReducer,
    ui: uiReducer
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(chatApi.middleware)
})
