import { AnyAction, ThunkAction } from "@reduxjs/toolkit";
import agent from "../../api/agent";
import { setProfile } from "../slices/profileSlice";
import { RootState } from "../store";




export const getProfile = (username:string):ThunkAction<void, RootState, unknown, AnyAction>=>{
    return async(dispatch)=>{
        try{
            const profile = await agent.Profiles.getProfile(username);
            dispatch(setProfile(profile))
        }catch(error){
            console.log(error);
        }
    }
}