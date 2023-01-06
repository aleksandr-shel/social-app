import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { User } from "../../models/User";


interface UserState{
    token: string | null,
    user: User | null,
    loading: boolean,
    refreshTokenTimeout:any,
}

const initialState:UserState={
    token: null,
    user: null,
    loading: false,
    refreshTokenTimeout: null,
}



const userSlice = createSlice({
    name:'users',
    initialState,
    reducers:{
        setUser: (state, action: PayloadAction<User>)=>{
            state.user = action.payload;
        },
        setToken: (state, action: PayloadAction<string | null>)=>{
            state.token = action.payload;
        },
        logout: (state)=>{
            state.token = null;
            state.user = null;
            window.localStorage.removeItem('ridiculum-token')
        },
        setLoading: (state, action: PayloadAction<boolean>)=>{
            state.loading = action.payload;
        },
        setRefreshTokenTimeout: (state, {payload}:PayloadAction<any>)=>{
            state.refreshTokenTimeout = payload;
        },
        stopRefreshTokenTimeout:(state)=>{
            clearTimeout(state.refreshTokenTimeout);
        }
    }
})

export const {logout, setToken, setUser, setLoading, setRefreshTokenTimeout, stopRefreshTokenTimeout} = userSlice.actions;

export default userSlice;