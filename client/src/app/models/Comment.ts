import { Author } from "./Post";

export interface Comment{
    id:string,
    postId:string,
    content:string,
    date:string,
    author:Author,
}

export interface CreateComment{
    postId:string,
    content:string,
}

export interface UpdateComment{
    content:string,
}

export interface DeleteComment{
    postId:string,
    commentId:string,
}