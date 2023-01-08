import { AnyAction, ThunkAction } from "@reduxjs/toolkit"
import agent from "../../api/agent"
import { Profile } from "../../models/User"
import { setFollowers, setFollowings, toggleFriendRed } from "../slices/friendsSlice"
import { toggleFollow } from "../slices/profileSlice"
import { RootState } from "../store"



export const getFollows = ():ThunkAction<void, RootState, unknown, AnyAction>=>{
    return async(dispatch)=>{
        try{
            const {followers, followings} = await agent.Friends.getFollows();
            dispatch(setFollowers(followers))
            dispatch(setFollowings(followings))
        }catch(error){
            console.log(error);
        }
    }
}

export const toggleFriend = (profile:Profile):ThunkAction<void, RootState, unknown, AnyAction>=>{
    return async(dispatch)=>{
        try{
            agent.Friends.toggleFriend(profile.username).then(response => {
                if (response.status === 200){
                    dispatch(toggleFriendRed(profile))
                    dispatch(toggleFollow())
                }
            })
        }catch(error){
            console.log(error);
        }
    }
}