
import {configureStore } from '@reduxjs/toolkit'
import  userSlice from '../Slice/Slice'
import counterReducer from '../Slice/CounterSlice'
export const storeData = configureStore({
    reducer: {
        userData : userSlice,
        counter: counterReducer
    }
})  

