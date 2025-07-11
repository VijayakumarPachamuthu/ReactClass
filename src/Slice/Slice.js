
import { createSlice } from '@reduxjs/toolkit'

const initialState = [];
export const userSlice = createSlice({
    name: "Customer",
    initialState,
    reducers: {
        addCustomerData: (state, action) => {
            state.push(action.payload)
        }
    }
})

export const { addCustomerData } = userSlice.actions;
export default userSlice.reducer ;  

