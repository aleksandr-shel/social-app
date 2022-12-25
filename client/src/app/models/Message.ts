import { Author } from "./Post";


export interface Message{
    id:string,
    roomId:string,
    content:string,
    sender:Author,
    date:string,
}


export interface PostMessage{
    content:string,
    roomId?:string,
}