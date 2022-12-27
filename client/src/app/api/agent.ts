import axios, { AxiosResponse } from "axios";
import { Image } from "../models/Image";
import { Message, PostMessage } from "../models/Message";
import { Post, PostCreate, PostUpdate } from "../models/Post";
import { Room } from "../models/Room";
import {Profile, ProfileUpdateValues, User,UserFormValues } from "../models/User";
import { FriendsState } from "../stores/slices/friendsSlice";
import store from "../stores/store";

axios.defaults.baseURL = 'https://localhost:5001/api/';

axios.interceptors.request.use(config =>{
    const token = store.getState().userReducer.token;
    if (token) config.headers!.Authorization = `Bearer ${token}`;
    return config;
})


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
    login: (user:UserFormValues)=>requests.post<User>('account/login', user),
    register: (user:UserFormValues)=>requests.post<User>('account/register', user),
    current: ()=>requests.get<User>('account/current')
}

const Posts = {
    getPosts: ()=>requests.get<Post[]>('posts'),
    getPost: (id:string)=> requests.get<Post>(`posts/${id}`),
    updatePost:(id:string, updatePost: PostUpdate) => requests.put<Post>(`posts/${id}`, updatePost),
    createPost:(newPost:PostCreate) => requests.post<Post>('posts', newPost),
    deletePost:(id:string) => requests.del(`posts/${id}`),
}

const Profiles = {
    getProfile:(username:string)=> requests.get<Profile>(`profile/${username}`),
    updateProfile:(updateProfile:ProfileUpdateValues)=>requests.put('profile', updateProfile),
    addImage:(file:Blob)=>{
        const formData = new FormData()
        formData.append('image', file);
        return axios.post<Image>('profile/image',formData,{
            headers:{'Content-type':'multipart/form-data'}
        })
    },
    deleteImage:(key:string)=>requests.del(`profile/image/${key}`),
    setMain:(key:string)=>requests.put(`profile/image/${key}`, {}),
    getImages:()=>requests.get<Image[]>('profile/images'),
    search:(q:string)=>requests.get<Profile[]>(`profile/search?q=${q}`)
}

const Friends = {
    toggleFriend:(username:string)=>axios.post(`friends/${username}`,{}),
    getFollows:()=>requests.get<FriendsState>('friends'),
}


const Messages = {
    getRooms: ()=>requests.get<Room[]>('messages/rooms'),
    getMessages: (roomId:string)=>requests.get<Message[]>(`messages/${roomId}`),
    postMessage:(username:string, message:PostMessage)=>requests.post<Message>(`messages/${username}`,message)
}

const agent = {
    Account,
    Posts,
    Profiles,
    Friends,
    Messages,
}

export default agent;