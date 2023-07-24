import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { Group } from "../../models/Group";

interface GroupsState{
    groups: Group[],
    selectedGroup: Group | null,
}

const initialState:GroupsState = {
    groups: [],
    selectedGroup: null
}

const groupSlice = createSlice({
    name:'groups',
    initialState,
    reducers:{
        setGroups:(state, {payload}:PayloadAction<Group[]>)=>{
            state.groups = payload;

        },
        selectGroup: (state, {payload}:PayloadAction<Group>)=>{
            state.selectedGroup = payload
        },
    }
})

export const {setGroups, selectGroup} = groupSlice.actions

export default groupSlice