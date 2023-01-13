import { Author } from "./Post";

export interface Room{
    id:string,
    users: Author[],
    lastUpdate: string,
    lastMessage: string,
}