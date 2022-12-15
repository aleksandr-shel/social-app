

export interface User {
    id:string,
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
    id:string,
    firstName:string,
    lastName:string,
    imageUrl:string,
    about:string
}