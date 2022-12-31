import { AnyAction, ThunkAction } from "@reduxjs/toolkit";
import agent from "../../api/agent";
import { ProfileUpdateValues } from "../../models/User";
import { closeModal } from "../slices/modalSlice";
import { setProfile, updateProfileImage, updateProfileRed } from "../slices/profileSlice";
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


export const updateProfileAct = (updateProfile:ProfileUpdateValues):ThunkAction<void, RootState, unknown, AnyAction>=>{
    return async(dispatch)=>{
        try{
            agent.Profiles.updateProfile(updateProfile).then((p)=>{
                dispatch(updateProfileRed(updateProfile))
            }).catch((reason)=>{
                console.log(reason)
            })
        }catch(error){
            console.log(error);
        }
    }
}

export const addImageAct = (file:File):ThunkAction<void, RootState, unknown, AnyAction>=>{
    return async(dispatch)=>{
        try{
            const image = await agent.Profiles.addImage(file).then(response => response.data);
            dispatch(updateProfileImage(image))
            dispatch(closeModal());
        }catch(error){
            console.log(error);
        }
    }
}
