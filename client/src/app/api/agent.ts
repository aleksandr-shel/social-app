import axios, { AxiosResponse } from "axios";
import { toast } from "react-toastify";
import { Image } from "../models/Image";
import { Message, PostMessage } from "../models/Message";
import { Author, Post, PostCreate, PostUpdate } from "../models/Post";
import { Room } from "../models/Room";
import {Profile, ProfileUpdateValues, User,UserFormValues } from "../models/User";
import { FriendsState } from "../stores/slices/friendsSlice";
import { logout } from "../stores/slices/userSlice";
import store from "../stores/store";
import { PaginatedResult } from "../models/pagination";
import { Group, GroupCreate, GroupPost, GroupUpdate } from "../models/Group";

axios.defaults.baseURL = process.env.REACT_APP_API_URL;

const sleep = (delay: number)=>{
    return new Promise(resolve =>{
        setTimeout(resolve, delay);
    })
}

axios.interceptors.request.use(config =>{
    const token = store.getState().userReducer.token;
    if (token) config.headers!.Authorization = `Bearer ${token}`;
    return config;
})


axios.interceptors.response.use(async response=>{
    // await sleep(1000);
    const pagination = response.headers['pagination'];
    if (pagination){
        response.data = new PaginatedResult(response.data, JSON.parse(pagination));
        return response as AxiosResponse<PaginatedResult<any>>
    }
    return response;
}, (error:any)=>{
    const {data, status, headers} = error.response!;
    console.log(error)
    switch(status){
        case 400:
            if (typeof data === 'string'){
                toast.error(data);
            }
            if (data.errors){
                let message = '';
                for (const key in data.errors){
                    if (data.errors[key]){
                        message += data.errors[key] + '\n';
                    }
                }
                toast.error(message);
            }
            break;
        case 401:
            if (status === 401 && headers['www-authenticate']?.startsWith('Bearer error="invalid_token"')){
                toast.error('Session expired - please login again');
            } else {
                toast.error('Unauthorised\n' + data);
                store.dispatch(logout())
            }
            break;
        case 404:
            toast.error('not found')
            break;
        case 500:
            toast.error('server-error')
            break;
    }
    return Promise.reject(error);
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
    current: ()=>requests.get<User>('account/current'),
    refreshToken:()=>requests.post<User>('/account/refreshToken',{}),
}

const Posts = {
    getPosts: (params: URLSearchParams)=>axios.get<PaginatedResult<Post[]>>('posts', {params}).then(responseBody),
    getPost: (id:string)=> requests.get<Post>(`posts/${id}`),
    updatePost:(id:string, updatePost: PostUpdate) => requests.put<Post>(`posts/${id}`, updatePost),
    createPost:async(newPost:PostCreate) => {
        // requests.post<Post>('posts', newPost)
        let formData = new FormData()
        formData.append('content', newPost.content)
        if (newPost.images !== undefined && newPost.images.length>0){
            newPost.images.forEach(image=>{
                formData.append('images',image);
            })
        }
        if (newPost.files !== undefined && newPost.files.length>0){
            newPost.files.forEach(file=>{
                formData.append('files',file);
            })
        }
        return axios.post<Post>('posts', formData,{
            headers:{'Content-Type':'multipart/form-data'}
        }).then(response=>{
            return response.data;
        })
    },
    deletePost:(id:string) => requests.del(`posts/${id}`),
    toggleFavorite:(id:string)=> requests.post(`favorite/${id}`,{}),
    favorite:()=>requests.get<Post[]>('favorite'),
}

const Profiles = {
    getProfile:(username:string)=> requests.get<Profile>(`profile/${username}`),
    updateProfile:(updateProfile:ProfileUpdateValues)=>requests.put<Profile>('profile', updateProfile),
    addImage:(image:File, isMain:boolean)=>{
        let formData = new FormData()
        formData.append('Image', image);
        formData.append('isMain', `${isMain}`);
        return axios.post<Image>('profile/Image',formData,{
            headers:{'Content-Type':'multipart/form-data'}
        })
    },
    deleteImage:(key:string)=>requests.del(`profile/image/${key}`),
    setMain:(key:string)=>requests.put(`profile/image/${key}`, {}),
    getImages:(username:string)=>requests.get<Image[]>(`profile/images/${username}`),
    search:(q:string)=>{
        return requests.get<Profile[]>(`profile/search?q=${q}`)
    }
}

const Friends = {
    toggleFriend:(username:string)=>axios.post(`friends/${username}`,{}),
    getFollows:()=>requests.get<FriendsState>('friends'),
    followings:()=>requests.get<Profile[]>('friends/followings'),
    followers:(username:string, n:number) => requests.get<Author[]>(`friends/${username}/followers/${n}`)
}


const Messages = {
    getRooms: ()=>requests.get<Room[]>('messages/rooms'),
    getMessages: (roomId:string)=>requests.get<Message[]>(`messages/${roomId}`),
    postMessage:(username:string, message:PostMessage)=>requests.post<Message>(`messages/${username}`,message),
    deleteMessage:(id:string)=>requests.del(`messages/${id}`),
}

const Groups = {
    list:()=>requests.get<Group[]>('group'),
    listToManage:()=>requests.get<Group[]>('group/manage'),
    get:(groupId:string) => requests.get<Group>(`group/${groupId}`),
    create:(newGroup:GroupCreate)=>{
        let formData = new FormData();
        formData.append('name',newGroup.name)
        formData.append('category',newGroup.category)
        formData.append('description',newGroup.description)
        if (newGroup.image){
            formData.append('image',newGroup.image)
        }

        if (newGroup.backgroundImage){
            formData.append('image',newGroup.backgroundImage)
        }

        return axios.post<Group>('group', formData,{
            headers:{'Content-Type':'multipart/form-data'}
        })
    },
    delete:(groupId:string)=>requests.del(`group/${groupId}`),
    update:(updateGroup:GroupUpdate)=>requests.put('group',updateGroup),
    toggleAdmin:(groupId:string, username:string)=>requests.put(`group/${groupId}/admin`,{}),
    followGroup:(groupId:string)=>requests.post(`group/follow/${groupId}`,{}),
    postInGroup:async(groupId:string, newPost:PostCreate)=>{
        let formData = new FormData()
        formData.append('content', newPost.content)
        if (newPost.images !== undefined && newPost.images.length>0){
            newPost.images.forEach(image=>{
                formData.append('images',image);
            })
        }
        if (newPost.files !== undefined && newPost.files.length>0){
            newPost.files.forEach(file=>{
                formData.append('files',file);
            })
        }
        return axios.post<GroupPost>(`group/post/${groupId}`,formData,{
            headers:{'Content-Type':'multipart/form-data'}
        }).then(response=>{
            return response.data;
        })
    },
    deletePostInGroup:(groupId:string, postId:string)=>requests.del(`group/post/${groupId}/${postId}`),
    updatePostInGroup:(groupId:string, postUpdate: PostUpdate)=>requests.put(`group/post/${groupId}`,postUpdate),
    getPosts:(groupId:string)=>requests.get(`group/post/${groupId}`),
    search:(q:string)=>requests.get<Group[]>(`group/search?q=${q}`)
}

const Search = {
    search:(q:string)=>requests.get(`search`)
}

const agent = {
    Account,
    Posts,
    Profiles,
    Friends,
    Messages,
    Groups,
    Search
}

export default agent;