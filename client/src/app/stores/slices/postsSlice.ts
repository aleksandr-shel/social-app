import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Post, PostUpdated } from "../../models/Post";
import { Pagination } from "../../models/pagination";

interface PostsState{
    posts: Post[] | null,
    loading: boolean,
    favoritePosts: Post[] | null,
    pagination: Pagination | null,
    pagingParam: {
        pageNumber:number,
        pageSize:number
    }
}

const initialState : PostsState = {
    loading: false,
    posts: [],
    favoritePosts:[],
    pagination: null,
    pagingParam: {
        pageNumber: 1,
        pageSize: 5
    }
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
        updatePost:(state, {payload}:PayloadAction<PostUpdated>)=>{
            state.posts = state.posts!.map(post => {
                return post.id === payload.id ? {...post, content: payload.content} : post
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
        addPosts:(state, {payload}: PayloadAction<Post[]>)=>{
            payload.forEach(post=>{
                state.posts?.push(post);
            })
        },
        setPagination: (state, action: PayloadAction<Pagination>)=>{
            state.pagination = action.payload;
        },
        setPageNumber: (state, action: PayloadAction<number>) =>{
            state.pagingParam.pageNumber = action.payload
        },
    }
})

export const {addPosts, setPosts, deletePostAction, setLoading, addPost, updatePost, toggleFavorite, setFavoritePosts, setPageNumber, setPagination} = postsSlice.actions

export default postsSlice