import axios, { AxiosResponse } from "axios";

axios.defaults.baseURL = '';


const responseBody = <T>(response:AxiosResponse<T>)=>{
    return response.data;
}


const requests = {
    get: <T>(url:string)=>axios.get<T>(url).then(responseBody),
    post: <T> (url: string, body:{})=> axios.post<T>(url, body).then(responseBody),
    put: <T> (url: string, body:{})=> axios.put<T>(url, body).then(responseBody),
    del: <T> (url: string)=> axios.delete<T>(url).then(responseBody)
}



const agent = {

}

export default agent;