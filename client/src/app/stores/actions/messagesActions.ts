import { HubConnection, HubConnectionBuilder, LogLevel } from "@microsoft/signalr";
import { AnyAction, ThunkAction } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import agent from "../../api/agent";
import { Message, PostMessage } from "../../models/Message";
import { Room } from "../../models/Room";
import { addMessage, addRoom, setHubConnection, setLoading, setMessages, setRooms } from "../slices/messagesSlice";
import { closeModal } from "../slices/modalSlice";
import { RootState } from "../store";



export const createHubConnection = ():ThunkAction<void, RootState, unknown, AnyAction>=>{
    return async (dispatch, getState)=>{
        console.log('in hub connection')
        const hubConnection:HubConnection = new HubConnectionBuilder()
            .withUrl(process.env.REACT_APP_MESSAGES_URL+'',
            {
                accessTokenFactory:()=>getState().userReducer.token!
            })
            .withAutomaticReconnect()
            .configureLogging(LogLevel.Information)
            .build();
        hubConnection.start().catch(error => console.log('Error establishing the connection', error))


        hubConnection.on('LoadMessages', (messages:Message[])=>{
            dispatch(setMessages(messages))
        })

        hubConnection.on('ReceiveMessage',(message:Message)=>{
            dispatch(addMessage(message))
        })

        hubConnection.on('ReceiveRoom', (room:Room)=>{
            dispatch(addRoom(room))
            toast.success('New message :)')
        })

        dispatch(setHubConnection(hubConnection));
    }
}


export const getRooms = ():ThunkAction<void, RootState, unknown, AnyAction>=>{
    return async(dispatch)=>{
        try{
            const rooms = await agent.Messages.getRooms();
            dispatch(setRooms(rooms));
        }catch(error){
            console.log(error);
        }
    }
}

export const getMessages = (roomId:string):ThunkAction<void, RootState, unknown, AnyAction>=>{
    return async(dispatch)=>{
        dispatch(setLoading(true))
        try{
            const messages = await agent.Messages.getMessages(roomId);
            dispatch(setMessages(messages))
            dispatch(setLoading(false))
        }catch(error){
            console.log(error);
            dispatch(setLoading(false))
        }
    }
}

export const postMessage = (username:string, message:PostMessage):ThunkAction<void, RootState, unknown, AnyAction>=>{
    return async (dispatch, getState)=>{
        try{
            await agent.Messages.postMessage(username, message);
            if (getState().modalReducer.open){
                setTimeout(()=>{
                    dispatch(closeModal())
                    toast.success('Message was sent successfully')
                },1500)
            }
        }catch(error){
            console.log(error)
        }
    }
}


export const connectToRoom = (roomId:string):ThunkAction<void, RootState, unknown, AnyAction>=>{
    return async (dispatch,getState)=>{
        try{
            await getState().messagesReducer.hubConnection?.invoke("ConnectToRoom", roomId)
        }catch(error){
            console.log(error);
        }
    }
}

export const disconnectFromRoom = (roomId:string):ThunkAction<void, RootState, unknown, AnyAction>=>{
    return async (dispatch,getState)=>{
        try{
            await getState().messagesReducer.hubConnection?.invoke("DisconnectFromRoom", roomId)
        }catch(error){
            console.log(error);
        }
    }
}