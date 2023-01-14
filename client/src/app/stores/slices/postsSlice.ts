import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Post } from "../../models/Post";

interface PostsState{
    posts: Post[] | null,
    loading: boolean,
    favoritePosts: Post[] | null,
}

const initialState : PostsState = {
    loading: false,
    posts: [],
    favoritePosts:[]
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
        },
        toggleFavorite:(state, {payload}:PayloadAction<string>)=>{
            state.posts = state.posts!.map(post => {
                if (post.id === payload){
                    post.liked = !post.liked;
                    if (post.liked){
                        post.likes++;
                    } else {
                        post.likes--;
                    }
                }
                return post;
            })
        },
        setFavoritePosts:(state, {payload}:PayloadAction<Post[] | null>)=>{
            state.favoritePosts = payload
        },
    }
})

export const {setPosts, deletePostAction, setLoading, addPost, updatePost, toggleFavorite, setFavoritePosts} = postsSlice.actions

export default postsSlice