import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Profile, ProfileUpdateValues } from "../../models/User";
import {Image} from '../../models/Image';
interface ProfileState{
    profile: Profile | null
}

const initialState: ProfileState={
    profile: null
}

const profileSlice = createSlice({
    name:'profile',
    initialState,
    reducers:{
        setProfile: (state, {payload}:PayloadAction<Profile | null> )=>{
            state.profile = payload;
        },
        toggleFollow: (state)=>{
            state.profile!.following = !state.profile?.following
        },
        updateProfileRed:(state, {payload}:PayloadAction<ProfileUpdateValues>)=>{
            state.profile!.about = payload.about;
            state.profile!.firstName = payload.firstName!;
            state.profile!.lastName = payload.lastName!;
        },
        updateProfileImage:(state, {payload}:PayloadAction<Image>)=>{
            state.profile!.imageUrl = payload.url;
            state.profile?.images.push(payload);
            state.profile?.images.forEach(x =>{
                if (x.key === payload.key){
                    x.isMain = true;
                } else {
                    x.isMain = false;
                }
            })
        },
        setMain:(state, {payload}:PayloadAction<Image>)=>{
            state.profile!.imageUrl = payload.url;

            state.profile?.images.forEach(x =>{
                if (x.key === payload.key){
                    x.isMain = true;
                } else {
                    x.isMain = false;
                }
            })
        },
        deleteImage:(state, {payload}:PayloadAction<Image>)=>{
            if (payload.isMain){
                state.profile!.imageUrl = undefined
            }
            state.profile!.images = state.profile!.images.filter(x => x.key !== payload.key)
        }
    }
})

export const {setProfile, toggleFollow, updateProfileRed, updateProfileImage, setMain, deleteImage} = profileSlice.actions

export default profileSlice