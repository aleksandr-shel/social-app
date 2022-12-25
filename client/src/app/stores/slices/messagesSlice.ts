import { HubConnection } from '@microsoft/signalr';
import {createSlice, PayloadAction} from '@reduxjs/toolkit'
import { Message } from '../../models/Message';
import { Room } from '../../models/Room';

interface MessagesState{
    rooms: Room[],
    hubConnection: HubConnection | null;
    messages: Message[],
    loadingMessages: boolean,
}

const initialState : MessagesState = {
    rooms: [],
    hubConnection: null,
    messages: [],
    loadingMessages: false,
}

const messagesSlice = createSlice({
    name:'messages',
    initialState,
    reducers:{
        setHubConnection: (state, action: PayloadAction<HubConnection>)=>{
            state.hubConnection = action.payload;
        },
        stopHubConnection: (state)=>{
            state.hubConnection?.stop().catch(error=> console.log('Error stoping connection',error))
        },
        setRooms:(state, {payload}:PayloadAction<Room[]>)=>{
            state.rooms = payload;
        },
        setMessages:(state, {payload}:PayloadAction<Message[]>)=>{
            // payload.reverse().forEach(m =>{
            //     state.messages.push(m);
            // })
            state.messages = payload.reverse()
        },
        setLoading: (state, {payload}:PayloadAction<boolean>)=>{
            state.loadingMessages = payload;
        },
        addMessage: (state, {payload}:PayloadAction<Message>)=>{
            state.messages.push(payload);
        }
    }
})

export const {setHubConnection, stopHubConnection, setRooms, setMessages, setLoading, addMessage} = messagesSlice.actions;

export default messagesSlice;