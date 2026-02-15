import { configureStore } from '@reduxjs/toolkit'
import {channelsApi} from './api/chatApi'
import authReducer from './authSlice';


export default configureStore({
  reducer: {
    [channelsApi.reducerPath]: channelsApi.reducer,
    auth: authReducer,
  },
  middleware: getDefaultMiddleware => getDefaultMiddleware().concat(channelsApi.middleware)
})