import { configureStore } from "@reduxjs/toolkit";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import appSlice from "./slices/appSlice";
import friendsSlice from "./slices/friendsSlice";
import imagesSlice from "./slices/imagesSlices";
import messagesSlice from "./slices/signalRSlice";
import modalSlice from "./slices/modalSlice";
import postsSlice from "./slices/postsSlice";
import profileSlice from "./slices/profileSlice";
import searchSlice from "./slices/searchSlice";
import userSlice from "./slices/userSlice";
import imageModalSlice from "./slices/imageModalSlice";
import groupSlice from "./slices/groupsSlice";

const store = configureStore({
    reducer:{
        userReducer: userSlice.reducer,
        appReducer: appSlice.reducer,
        postsReducer: postsSlice.reducer,
        signalrReducer: messagesSlice.reducer,
        profileReducer: profileSlice.reducer,
        searchReducer: searchSlice.reducer,
        friendsReducer: friendsSlice.reducer,
        modalReducer: modalSlice.reducer,
        imagesReducer: imagesSlice.reducer,
        imageModalReducer: imageModalSlice.reducer,
        groupReducer: groupSlice.reducer,
    },
    middleware:(getDefaultMiddleware)=> getDefaultMiddleware({
        serializableCheck: false
    })
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch = ()=> useDispatch<AppDispatch>()
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector

export default store;