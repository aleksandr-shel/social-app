import { AnyAction, ThunkAction } from "@reduxjs/toolkit";
import userSlice, { setRefreshTokenTimeout, stopRefreshTokenTimeout } from "../slices/userSlice";
import { RootState } from "../store";
import agent from "../../api/agent";
import { User, UserFormValues } from "../../models/User";

export const userActions = userSlice.actions;


export const login = (user: UserFormValues):ThunkAction<void, RootState, unknown, AnyAction>=>{
    return async (dispatch)=>{
        try{
            dispatch(userActions.setLoading(true))
            const response = await agent.Account.login(user);
            dispatch(userActions.setUser(response));
            dispatch(userActions.setToken(response.token));
            dispatch(startRefreshTokenTimer(response))
            window.localStorage.setItem('netverse-token', response.token)
            dispatch(userActions.setLoading(false))
        }catch(error){
            console.log(error);
            dispatch(userActions.setLoading(false))
        }
    }
}

export const register = (user: UserFormValues):ThunkAction<void, RootState, unknown, AnyAction>=>{
    return async (dispatch)=>{
        try{
            dispatch(userActions.setLoading(true))
            const response = await agent.Account.register(user);
            dispatch(userActions.setUser(response))
            dispatch(userActions.setToken(response.token))
            dispatch(startRefreshTokenTimer(response))
            window.localStorage.setItem('netverse-token', response.token)
            dispatch(userActions.setLoading(false))
        }catch(error){
            console.log(error);
            dispatch(userActions.setLoading(false))
        }
    }
}


export const current = ():ThunkAction<void, RootState, unknown, AnyAction>=>{
    return async (dispatch)=>{
        try{
            const response = await agent.Account.current();
            dispatch(userActions.setUser(response))
            dispatch(userActions.setToken(response.token))
            // dispatch(startRefreshTokenTimer(response))
            window.localStorage.setItem('netverse-token', response.token)
        }catch(error){
            console.log(error);
        }
    }
}

export const refreshToken = ():ThunkAction<void, RootState, unknown, AnyAction>=>{
    return async (dispatch)=>{
        dispatch(stopRefreshTokenTimeout())
        try{
            const response = await agent.Account.refreshToken();
            dispatch(userActions.setUser(response))
            dispatch(userActions.setToken(response.token))
            dispatch(startRefreshTokenTimer(response))
            console.log('refreshed token');
            window.localStorage.setItem('netverse-token', response.token)
        }catch(error){
            console.log(error);
        }
    }
}

export const startRefreshTokenTimer = (user:User):ThunkAction<void, RootState, unknown, AnyAction>=>{
    return async(dispatch)=>{
        const jwtToken = JSON.parse(atob(user.token.split('.')[1]))
        const expires = new Date(jwtToken.exp * 1000);
        const timeout = expires.getTime() - Date.now() - (60 * 1000);
        console.log(timeout);
        const refreshTokenTimeout = setTimeout(()=>{dispatch(refreshToken())}, timeout);
        dispatch(setRefreshTokenTimeout(refreshTokenTimeout))
    }
}