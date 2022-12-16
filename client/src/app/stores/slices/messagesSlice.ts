import {createSlice} from '@reduxjs/toolkit'
import { Room } from '../../models/Room';
import { Profile } from '../../models/User';

interface MessagesState{
    rooms: Room[],
    profiles: Profile[]
}

const initialState : MessagesState = {
    rooms: [],
    profiles: []
}

const messagesSlice = createSlice({
    name:'messages',
    initialState,
    reducers:{

    }
})


export default messagesSlice;