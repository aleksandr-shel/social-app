import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { Group } from "../../models/Group";

interface GroupsState{
    groups: Group[]
}

const initialState:GroupsState = {
    groups: []
}

const groupSlice = createSlice({
    name:'groups',
    initialState,
    reducers:{
        setGroups:(state, {payload}:PayloadAction<Group[]>)=>{
            state.groups = payload;

        }
    }
})

export const {setGroups} = groupSlice.actions

export default groupSlice