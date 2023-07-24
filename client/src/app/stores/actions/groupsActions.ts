import { AnyAction, ThunkAction } from "@reduxjs/toolkit";
import { RootState } from "../store";
import agent from "../../api/agent";
import { selectGroup, setGroups } from "../slices/groupsSlice";


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