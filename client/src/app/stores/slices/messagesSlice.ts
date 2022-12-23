import { HubConnection } from '@microsoft/signalr';
import {createSlice, PayloadAction} from '@reduxjs/toolkit'
import { Room } from '../../models/Room';
import { Profile } from '../../models/User';

interface MessagesState{
    rooms: Room[],
    profiles: Profile[],
    hubConnection: HubConnection | null;
}

const initialState : MessagesState = {
    rooms: [],
    profiles: [],
    hubConnection: null
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
        }
    }
})

export const {setHubConnection, stopHubConnection} = messagesSlice.actions;

export default messagesSlice;