import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Profile } from "../../models/User";

interface SearchState{
    results: Profile[]
}

const initialState:SearchState={
    results: []
}

const searchSlice = createSlice({
    name:'search',
    initialState,
    reducers:{
        setResults:(state, {payload}:PayloadAction<Profile[]>) =>{
            state.results = payload
        }
    }
})


export const {setResults} = searchSlice.actions

export default searchSlice;