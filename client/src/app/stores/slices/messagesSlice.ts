import {createSlice} from '@reduxjs/toolkit'
import { Room } from '../../models/Room';
import { Profile } from '../../models/User';
import profiless from './profiles.json'

interface MessagesState{
    rooms: Room[],
    profiles: Profile[]
}

const initialState : MessagesState = {
    rooms: [],
    profiles: profiless
}

const messagesSlice = createSlice({
    name:'messages',
    initialState,
    reducers:{

    }
})


export default messagesSlice;