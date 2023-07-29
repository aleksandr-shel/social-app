import { HubConnection } from '@microsoft/signalr';
import {createSlice, PayloadAction} from '@reduxjs/toolkit'
import { Message } from '../../models/Message';
import { Author } from '../../models/Post';
import { Room } from '../../models/Room';

interface SignalRState{
    rooms: Room[],
    hubConnection: HubConnection | null;
    messages: Message[],
    loadingMessages: boolean,
    partner: Author | null,
    selectedRoom: Room | null,
    connected: boolean,
}

const initialState : SignalRState = {
    rooms: [],
    hubConnection: null,
    messages: [],
    loadingMessages: false,
    partner: null,
    selectedRoom: null,
    connected: false,
}

const signalRSlice = createSlice({
    name:'messages',
    initialState,
    reducers:{
        setHubConnection: (state, action: PayloadAction<HubConnection>)=>{
            state.hubConnection = action.payload;
        },
        stopHubConnection: (state)=>{
            console.log('stoping hub connection')
            state.hubConnection?.stop().catch(error=> console.log('Error stoping connection',error))
        },
        setRooms:(state, {payload}:PayloadAction<Room[]>)=>{
            state.rooms = payload;
        },
        setMessages:(state, {payload}:PayloadAction<Message[]>)=>{
            // payload.forEach(m =>{
            //     state.messages.push(m);
            // })
            state.messages = payload;
        },
        setLoading: (state, {payload}:PayloadAction<boolean>)=>{
            state.loadingMessages = payload;
        },
        addMessage: (state, {payload}:PayloadAction<Message>)=>{

            if (state.selectedRoom?.id === payload.roomId){
                state.messages.unshift(payload);
            }

            state.rooms = state.rooms.map(x => x.id === payload.roomId ? {...x, lastMessage: payload.content, lastUpdate:payload.date} : x);

            state.rooms = state.rooms.sort((a,b)=>{
                return new Date(b.lastUpdate).valueOf() - new Date(a.lastUpdate).valueOf();
            })
        },
        setPartner: (state, {payload}:PayloadAction<Author>)=>{
            state.partner = payload;
        },
        selectRoom: (state, {payload}:PayloadAction<Room | null>)=>{
            state.selectedRoom = payload;
        },
        addRoom: (state, {payload}:PayloadAction<Room>)=>{
            state.rooms.unshift(payload);
        },
        deleteMessage:(state, {payload}:PayloadAction<string>)=>{
            state.messages = state.messages.filter(x=>x.id !== payload);
        },
        setRoomLastMessageAndLastUpdate:(state,{payload}:PayloadAction<string>)=>{

        },
        setConnected: (state,{payload}:PayloadAction<boolean>)=>{
            state.connected = payload;
        }
    }
})

export const {setHubConnection, stopHubConnection, setRooms, setMessages, setLoading, addMessage, setPartner, selectRoom, addRoom, deleteMessage, setConnected} = signalRSlice.actions;

export default signalRSlice;