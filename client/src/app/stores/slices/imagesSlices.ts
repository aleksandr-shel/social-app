import { createSlice } from "@reduxjs/toolkit";
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
        
    }
})


export default imagesSlice;