

export interface Post{
    id:string,
    content:string,
    author:Author,
    date:string
}


interface Author {
    id:string,
    firstName:string,
    lastName:string,
}

export interface PostUpdate{
    content: string
}

export interface PostCreate{
    content:string
}