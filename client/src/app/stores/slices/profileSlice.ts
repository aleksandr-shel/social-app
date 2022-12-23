import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Profile } from "../../models/User";

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
        }
    }
})

export const {setProfile, toggleFollow} = profileSlice.actions

export default profileSlice