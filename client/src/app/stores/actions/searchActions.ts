import { AnyAction, ThunkAction } from "@reduxjs/toolkit"
import agent from "../../api/agent"
import { setResults } from "../slices/searchSlice"
import { RootState } from "../store"



export const searchProfiles = (q:string):ThunkAction<void,RootState, unknown, AnyAction>=>{
    return async(dispatch)=>{
        try{
            const profiles = await agent.Profiles.search(q);
            dispatch(setResults(profiles))
        }catch(error){
            console.log(error);
        }
    }
}