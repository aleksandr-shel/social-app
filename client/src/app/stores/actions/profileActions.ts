import { AnyAction, ThunkAction } from "@reduxjs/toolkit";
import agent from "../../api/agent";
import { Image } from "../../models/Image";
import { ProfileUpdateValues } from "../../models/User";
import { closeModal } from "../slices/modalSlice";
import { addProfileImage, deleteImage, setMain, setProfile, setProfileImages, updateProfileImage, updateProfileRed } from "../slices/profileSlice";
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

export const addImageAct = (file:File, isMain: boolean):ThunkAction<void, RootState, unknown, AnyAction>=>{
    return async(dispatch)=>{
        try{
            const image = await agent.Profiles.addImage(file, isMain).then(response => response.data);
            if (isMain){
                dispatch(updateProfileImage(image))
            } else {
                dispatch(addProfileImage(image))
            }
            dispatch(closeModal());
        }catch(error){
            console.log(error);
        }
    }
}

export const setMainImageAct = (image:Image):ThunkAction<void, RootState, unknown, AnyAction>=>{
    return async(dispatch)=>{
        try{
            agent.Profiles.setMain(image.key).then(()=>{
                dispatch(setMain(image));
            })
        }catch(error){
            console.log(error);
        }
    }
}


export const deleteImageAct = (image:Image):ThunkAction<void, RootState, unknown, AnyAction>=>{
    return async(dispatch)=>{
        try{
            agent.Profiles.deleteImage(image.key).then(()=>{
                dispatch(deleteImage(image))
            })
        }catch(error){
            console.log(error);
        }
    }
}


export const getProfileImages = (username:string):ThunkAction<void, RootState, unknown, AnyAction>=>{
    return async(dispatch)=>{
        try{
            const images = await agent.Profiles.getImages(username);
            dispatch(setProfileImages(images))
        }catch(error){
            console.log(error);
        }
    }
}