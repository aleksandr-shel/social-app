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
        }
    }
})

export const {setProfile} = profileSlice.actions

export default profileSlice