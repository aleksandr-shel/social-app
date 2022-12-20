import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Profile } from "../../models/User";

export interface FriendsState{
    friends:Profile[],
    followers: Profile[],
    followings: Profile[],
}

const initialState:FriendsState = {
    friends: [],
    followers: [],
    followings: [],
}

const friendsSlice = createSlice({
    name:'friends',
    initialState,
    reducers:{
        toggleFriendRed: (state, {payload}:PayloadAction<Profile>)=>{
            if (state.followings.includes(payload)){
                state.followings = state.followings.filter(x => x !== payload)
            } else {
                state.followings.push(payload);
            }
        },
        setFriends: (state, {payload}:PayloadAction<Profile[]>)=>{
            state.friends = payload
        },
        setFollowers: (state, {payload}:PayloadAction<Profile[]>)=>{
            state.followers = payload
        },
        setFollowings: (state, {payload}:PayloadAction<Profile[]>)=>{
            state.followings = payload
        },
    }
})

export const {toggleFriendRed, setFriends, setFollowers, setFollowings} = friendsSlice.actions


export default friendsSlice