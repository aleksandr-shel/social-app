import { PayloadAction, createSlice } from "@reduxjs/toolkit";

interface ImageModalState{
    open: boolean;
    body: JSX.Element | null
}

const initialState : ImageModalState = {
    open: false,
    body: null
}

const imageModalSlice = createSlice({
    name:'imagemodal',
    initialState,
    reducers:{
        setActive:(state, action: PayloadAction<boolean>)=>{
            state.open = action.payload;
        },
        setBody:(state, action: PayloadAction<JSX.Element | null>)=>{
            state.body = action.payload;
        },
        closeModal:(state)=>{
            state.body = null;
            state.open = false;
        },
        openModal:(state, action: PayloadAction<JSX.Element>)=>{
            state.body = action.payload;
            state.open = true;
        },
    }
})

export const {closeModal, openModal} = imageModalSlice.actions;


export default imageModalSlice;