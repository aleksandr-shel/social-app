import { Author } from "./Post";

export interface Room{
    id:string,
    users: Author[]
}