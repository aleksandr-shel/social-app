import {Image} from './Image'
import { Post } from './Post'

export interface User {
    username:string,
    firstName:string,
    lastName:string,
    email:string,
    token:string,
}


export interface UserFormValues {
    firstName?:string,
    lastName?:string,
    email:string,
    password:string
}

export interface ProfileUpdateValues{
    firstName?:string,
    lastName?:string,
    about: string
}

export interface Profile{
    username:string,
    firstName:string,
    lastName:string,
    imageUrl:string,
    about:string,
    images: Image[],
    posts: Post[],
    following: boolean,
}