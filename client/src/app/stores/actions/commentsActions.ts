import { AnyAction, ThunkAction } from "@reduxjs/toolkit"
import { RootState } from "../store"
import { CreateComment, DeleteComment } from "../../models/Comment"
import agent from "../../api/agent"
import { addComment, addComments, deleteComment } from "../slices/postsSlice"


export const loadComments = (postId:string):ThunkAction<void, RootState, unknown, AnyAction>=>{

    return async(dispatch)=>{
        try{
            const comments = await agent.Comments.getMoreComments(postId)
            dispatch(addComments(comments));
        }catch(err){
            console.log(err)
        }
    }
}

export const createComment = (comment:CreateComment):ThunkAction<void, RootState, unknown, AnyAction>=>{
    return async (dispatch)=>{
        try{
            const createdComment = await agent.Comments.createComment(comment);
            dispatch(addComment(createdComment))
        }catch(err){
            console.log(err)
        }
    }
}


export const deleteCommentAct = (comment:DeleteComment):ThunkAction<void, RootState, unknown, AnyAction>=>{
    return async (dispatch)=>{
        agent.Comments.deleteComment(comment.commentId).then(()=>{
            dispatch(deleteComment(comment))
        }).catch(err=>{
            console.log(err)
        })
    }
}