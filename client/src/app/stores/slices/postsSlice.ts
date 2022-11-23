import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Post } from "../../models/Post";

interface PostsState{
    posts: Post[] | null,
    loading: boolean,
}

const initialState : PostsState = {
    loading: false,
    posts: []
}

const postsSlice = createSlice({
    name:"posts",
    initialState,
    reducers:{
        setPosts:(state, {payload}:PayloadAction<Post[] | null>)=>{
            state.posts = payload
        },
        deletePostAction:(state, {payload}:PayloadAction<string>)=>{
            state.posts = state.posts!.filter(x=>{
                return x.id !== payload
            })
        },
        setLoading:(state, {payload}:PayloadAction<boolean>)=>{
            state.loading = payload
        },
        addPost:(state, {payload}:PayloadAction<Post>)=>{
            state.posts?.unshift(payload);
        },
        updatePost:(state, {payload}:PayloadAction<Post>)=>{
            state.posts = state.posts!.map(post => {
                return post.id === payload.id ? payload : post
            })
        }
    }
})

export const {setPosts, deletePostAction, setLoading, addPost, updatePost} = postsSlice.actions

export default postsSlice