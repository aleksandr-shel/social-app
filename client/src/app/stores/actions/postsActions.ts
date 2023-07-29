import { AnyAction, ThunkAction} from "@reduxjs/toolkit"
import agent from "../../api/agent"
import { PostCreate, PostUpdate } from "../../models/Post"
import { addPost, addPosts, deletePostAction, setFavoritePosts, setLoading, setPageNumber, setPagination, setPosts, updatePost } from "../slices/postsSlice"
import { RootState } from "../store"

export const getPosts = ():ThunkAction<void, RootState, unknown, AnyAction>=>{
    return async(dispatch, getState)=>{
        // console.log('getting posts');
        dispatch(setLoading(true))
        try{
            const params = new URLSearchParams();
            const {pagingParam} = getState().postsReducer
            params.append('pageNumber', pagingParam.pageNumber.toString());
            params.append('pageSize', pagingParam.pageSize.toString())
            const result = await agent.Posts.getPosts(params);
            dispatch(setLoading(false))
            dispatch(setPosts(result.data));
            dispatch(setPagination(result.pagination));
        }catch(error){
            console.log(error);
            dispatch(setLoading(false))
        }
    }
}

export const getNextPosts = ():ThunkAction<void, RootState, unknown, AnyAction>=>{
    return async(dispatch, getState)=>{
        console.log('getting next', getState().postsReducer.loading);
        try{
            if (!getState().postsReducer.loading && !!getState().postsReducer.pagination && getState().postsReducer.pagination!.currentPage < getState().postsReducer.pagination!.totalPages){
                dispatch(setLoading(true))
                dispatch(setPageNumber(getState().postsReducer.pagination?.currentPage! + 1))
                const params = new URLSearchParams();
                const {pagingParam} = getState().postsReducer
                params.append('pageNumber', pagingParam.pageNumber.toString());
                params.append('pageSize', pagingParam.pageSize.toString())
                const result = await agent.Posts.getPosts(params);
                dispatch(addPosts(result.data));
                dispatch(setPagination(result.pagination));
                dispatch(setLoading(false))
            }
        }catch(error){
            console.log(error);
            dispatch(setLoading(false))
        }
    }
}

export const deletePost = (id:string):ThunkAction<void, RootState, unknown, AnyAction>=>{
    return async(dispatch)=>{
        try{
            agent.Posts.deletePost(id).then(()=>{
                dispatch(deletePostAction(id));
            })
        } catch(error){
            console.log(error);
        }
    }
}

export const createPost = (postCreate:PostCreate):ThunkAction<void, RootState, unknown, AnyAction>=>{
    return async(dispatch)=>{
        try{
            agent.Posts.createPost(postCreate).then((newPost)=>{
                dispatch(addPost(newPost));
            })
        } catch(error){
            console.log(error);
        }
    }
}

export const editPost = (id:string, updateP:PostUpdate):ThunkAction<void, RootState, unknown, AnyAction>=>{
    return async(dispatch)=>{
        try{
            agent.Posts.updatePost(id, updateP).then(()=>{
                dispatch(updatePost({id, content:updateP.content}));
            })
        } catch(error){
            console.log(error);
        }
    }
}


export const getFavoritePosts = ():ThunkAction<void, RootState, unknown, AnyAction>=>{
    return async(dispatch)=>{
        dispatch(setLoading(true))
        try{
            const posts = await agent.Posts.favorite();
            dispatch(setFavoritePosts(posts));
            dispatch(setLoading(false))
        }catch(error){
            console.log(error);
            dispatch(setLoading(false))
        }
    }
}