import { createSlice } from "@reduxjs/toolkit";
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

    }
})