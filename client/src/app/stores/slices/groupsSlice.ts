import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { Group } from "../../models/Group";

interface GroupsState{
    groups: Group[],
    selectedGroup: Group | null,
    searchResults:Group[],
    manageGroups:Group[],
}

const initialState:GroupsState = {
    groups: [],
    selectedGroup: null,
    searchResults:[],
    manageGroups:[]
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
        setSearchResults:(state, {payload}:PayloadAction<Group[]>)=>{
            state.searchResults = payload;
        },
        toggleGroupFollow:(state,{payload}:PayloadAction<string>)=>{
            let temp_group : Group | null = null;
            let followed : boolean = false;
            state.groups =  state.groups!.map((group, index)=>{
                if (group.id === payload){
                    temp_group = {...group, follow: !group.follow};
                    followed = !group.follow
                }
                return group.id === payload ? {...group, follow: !group.follow} : group
            })

            state.searchResults =  state.searchResults!.map((group, index)=>{
                if (group.id === payload){
                    temp_group = {...group, follow: !group.follow};
                    followed = !group.follow
                }
                return group.id === payload ? {...group, follow: !group.follow} : group
            })

            if (followed && temp_group !== null){
                state.groups.push(temp_group)
            } else {
                state.groups = state.groups.filter((grp, ind)=>{
                    return grp.id !== temp_group?.id
                })
            }
        }
    }
})

export const {setGroups, selectGroup, setSearchResults, toggleGroupFollow} = groupSlice.actions

export default groupSlice