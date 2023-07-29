import { Author } from "./Post";

export interface Comment{
    id:string,
    postId:string,
    content:string,
    date:string,
    author:Author,
}