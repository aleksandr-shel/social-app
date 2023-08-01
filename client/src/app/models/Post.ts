import { Document } from "./Document"
import { Image } from "./Image"
import { Comment } from "./Comment"

export interface Post{
    id:string,
    content:string,
    author:Author,
    date:string,
    images: Image[],
    documents: Document[],
    likes:number,
    liked:boolean,
    commentsTotal:number,
    comments:Comment[],
}


export interface Author {
    username:string,
    firstName:string,
    lastName:string,
    imageUrl:string
}

export interface PostUpdate{
    content: string
}

export interface PostUpdated{
    id:string,
    content:string,
}

export interface PostCreate{
    content:string,
    files?:File[],
    images?:File[],
}