import { Image } from "./Image"


export interface Post{
    id:string,
    content:string,
    author:Author,
    date:string,
    images: Image[],
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

export interface PostCreate{
    content:string,
    files?:File[],
}