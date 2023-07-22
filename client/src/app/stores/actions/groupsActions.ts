import { AnyAction, ThunkAction } from "@reduxjs/toolkit";
import { RootState } from "../store";
import agent from "../../api/agent";
import { setGroups } from "../slices/groupsSlice";


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