import { configureStore } from "@reduxjs/toolkit";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import appSlice from "./slices/appSlice";
import friendsSlice from "./slices/friendsSlice";
import messagesSlice from "./slices/messagesSlice";
import postsSlice from "./slices/postsSlice";
import profileSlice from "./slices/profileSlice";
import searchSlice from "./slices/searchSlice";
import userSlice from "./slices/userSlice";

const store = configureStore({
    reducer:{
        userReducer: userSlice.reducer,
        appReducer: appSlice.reducer,
        postsReducer: postsSlice.reducer,
        messagesReducer: messagesSlice.reducer,
        profileReducer: profileSlice.reducer,
        searchReducer: searchSlice.reducer,
        friendsReducer: friendsSlice.reducer,
    }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch = ()=> useDispatch<AppDispatch>()
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector

export default store;