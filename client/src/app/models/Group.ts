import { Image } from "./Image"

export interface Group{
    id:string,
    name:string,
    description:string,
    category:string,
    isAdmin:boolean,
    followers: number,
    image:string,
    backgroundImage:string,
    follow:boolean
}

export interface GroupPost{
    id:string,
    content:string,
    group:Group,
    date:string,
    images: Image[],
    documents: Document[],
    likes:number,
    liked:boolean,
}


export interface GroupCreate{
    name:string,
    description:string,
    category:string,
    image?:File,
    backgroundImage?:File,
}

export interface GroupUpdate{
    id:string,
    name:string,
    description:string,
    category:string,
}