import { configureStore } from '@reduxjs/toolkit'
import  userSlice  from './Slice/userSlice'
import appointementReducer from './Slice/appointementSlice'; 

export const store = configureStore({
  reducer: {
    user : userSlice,
    appointements: appointementReducer,

  },
})