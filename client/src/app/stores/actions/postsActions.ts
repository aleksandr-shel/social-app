import { AnyAction, ThunkAction } from "@reduxjs/toolkit"
import agent from "../../api/agent"
import { PostCreate, PostUpdate } from "../../models/Post"
import { addPost, deletePostAction, setPosts, updatePost } from "../slices/postsSlice"
import { setLoading } from "../slices/userSlice"
import { RootState } from "../store"



export const getPosts = ():ThunkAction<void, RootState, unknown, AnyAction>=>{
    return async(dispatch)=>{
        dispatch(setLoading(true))
        try{
            const posts = await agent.Posts.getPosts();
            dispatch(setPosts(posts));
            dispatch(setLoading(false))
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

export const editPost = (id:string, updateCreate:PostUpdate):ThunkAction<void, RootState, unknown, AnyAction>=>{
    return async(dispatch)=>{
        try{
            agent.Posts.updatePost(id, updateCreate).then((updatedPost)=>{
                dispatch(updatePost(updatedPost));
            })
        } catch(error){
            console.log(error);
        }
    }
}