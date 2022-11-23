import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface AppState {
    appLoading: boolean,
}

const initialState:AppState = {
    appLoading: true,
}

const appSlice = createSlice({
    name:'app',
    initialState,
    reducers:{
        setAppLoading:(state, {payload}:PayloadAction<boolean>)=>{
            state.appLoading = payload
        }
    }
})

export const {setAppLoading} = appSlice.actions;

export default appSlice;