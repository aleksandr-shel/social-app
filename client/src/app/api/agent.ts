import axios, { AxiosResponse } from "axios";
import {User,UserFormValues } from "../models/User";

axios.defaults.baseURL = 'https://localhost:5001/api';


const responseBody = <T>(response:AxiosResponse<T>)=>{
    return response.data;
}


const requests = {
    get: <T>(url:string)=>axios.get<T>(url).then(responseBody),
    post: <T> (url: string, body:{})=> axios.post<T>(url, body).then(responseBody),
    put: <T> (url: string, body:{})=> axios.put<T>(url, body).then(responseBody),
    del: <T> (url: string)=> axios.delete<T>(url).then(responseBody)
}


const Account = {
    login: (user:UserFormValues)=>requests.post<User>('account/', user),
    register: (user:UserFormValues)=>requests.post<User>('account/register', user),
    current: ()=>requests.get<User>('account/current')
}

const Posts = {

}

const agent = {
    Account,
    Posts
}

export default agent;