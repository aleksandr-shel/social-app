import { AnyAction, ThunkAction } from "@reduxjs/toolkit";
import userSlice from "../slices/userSlice";
import { RootState } from "../store";
import agent from "../../api/agent";
import { UserFormValues } from "../../models/User";

export const userActions = userSlice.actions;


export const login = (user: UserFormValues):ThunkAction<void, RootState, unknown, AnyAction>=>{
    return async (dispatch)=>{
        try{
            dispatch(userActions.setLoading(true))
            const response = await agent.Account.login(user);
            dispatch(userActions.setUser(response));
            dispatch(userActions.setToken(response.token));
            window.localStorage.setItem('coopchik-token', response.token)
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
            window.localStorage.setItem('coopchik-token', response.token)
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
            window.localStorage.setItem('coopchik-token', response.token)
        }catch(error){
            console.log(error);
        }
    }
}