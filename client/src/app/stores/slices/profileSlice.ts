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
        }
    }
})

export const {setProfile, toggleFollow, updateProfileRed, updateProfileImage} = profileSlice.actions

export default profileSlice