import { createSlice, PayloadAction, current } from "@reduxjs/toolkit";
import { Image } from "../../models/Image";

interface ImagesState{
    currentImage:Image | null,
    images:Image[],
}

const initialState:ImagesState={
    currentImage:null,
    images:[],
}

const imagesSlice = createSlice({
    name:'images',
    initialState,
    reducers:{
        setCurrentImage:(state, {payload}:PayloadAction<Image>)=>{
            state.currentImage = payload;
        },
        clearCurrentImageAndImages:(state)=>{
            state.currentImage = null;
            state.images = [];
            // console.log(current(state))
        },
        setImages:(state, {payload}:PayloadAction<Image[]>)=>{
            state.images = payload;
        },
        moveLeft:(state)=>{
            const currentState = current(state);
            if (currentState.images.indexOf(currentState.currentImage!) <= 0){
                state.currentImage = state.images[currentState.images.length - 1]
            } else {
                state.currentImage = state.images[currentState.images.indexOf(currentState.currentImage!) - 1]
            }
        },
        moveRight:(state)=>{
            const currentState = current(state);
            if (currentState.images.indexOf(currentState.currentImage!) >= currentState.images.length - 1){
                state.currentImage = state.images[0]
            } else {
                state.currentImage = state.images[currentState.images.indexOf(currentState.currentImage!) + 1]
            }
        },
    }
})

export const {setCurrentImage, setImages, moveLeft, moveRight, clearCurrentImageAndImages} = imagesSlice.actions;
export default imagesSlice;