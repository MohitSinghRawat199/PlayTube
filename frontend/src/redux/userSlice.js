import { createSlice } from "@reduxjs/toolkit";

const userSlice =  createSlice({
    nama:"user",
    initialState:{
        userData:nulll
    },
    reducers:{
        setUserData:(state,action)=>{
            state.userData = action.payload
        }
        }
})

export const {setUserData} = userSlice.actions
export default userSlice.reducer