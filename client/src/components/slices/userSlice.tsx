import { createSlice } from "@reduxjs/toolkit";

const initialState = {userInfo : localStorage.getItem('userInfo') ? JSON.parse(localStorage.getItem('userInfo')) : null}

const userSlice = createSlice({
    name:'user',
    initialState:initialState,
    reducers:{
        addUser:(state,action)=>{
            state.userInfo = action.payload;
            localStorage.setItem('userInfo',JSON.stringify(action.payload))
            // return action.payload
        },
        removeUser:(state)=>{
            state.userInfo = null;
            localStorage.removeItem('userInfo')
            // return null;
        }
    }
})
export const {addUser,removeUser} = userSlice.actions
export default userSlice.reducer;