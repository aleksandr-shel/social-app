import { AnyAction, ThunkAction } from "@reduxjs/toolkit";
import { RootState } from "../store";
import agent from "../../api/agent";
import { selectGroup, setGroups, setSearchResults, toggleGroupFollow } from "../slices/groupsSlice";


export const loadGroups = ():ThunkAction<void, RootState, unknown, AnyAction> =>{
    return async (dispatch)=>{
        try{
            const groups = await agent.Groups.list();

            dispatch(setGroups(groups))
        }catch(err){
            console.log(err);
        }
    }
}

export const loadSelectedGroup = (groupId:string):ThunkAction<void, RootState, unknown, AnyAction> =>{
    return async (dispatch)=>{
        console.log('loading a group')
        try{
            const group = await agent.Groups.get(groupId);
            dispatch(selectGroup(group))
        }catch(err){
            console.log(err);
        }
    }
}

export const searchGroups = (q:string):ThunkAction<void, RootState, unknown, AnyAction> =>{
    return async (dispatch)=>{
        console.log('loading a group')
        try{
            const groups = await agent.Groups.search(q)
            dispatch(setSearchResults(groups))
        }catch(err){
            console.log(err);
        }
    }
}

export const toggleFollowGroupAction = (groupId:string):ThunkAction<void, RootState, unknown, AnyAction>=>{
    return async (dispatch)=>{
        agent.Groups.followGroup(groupId).then(()=>{
            dispatch(toggleGroupFollow(groupId))
        }).catch(err=>{
            console.log(err)
        })
    }
}