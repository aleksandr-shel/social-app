import {List}from '@mui/material';
import * as React from 'react';
import { getRooms } from '../../app/stores/actions/messagesActions';
import { useAppDispatch, useAppSelector } from '../../app/stores/store';
import RoomComponent from './RoomComponent';

interface Props{
    setRoomId: (roomId:string)=>void
}

function MessagesUsers({setRoomId}:Props) {

    const {rooms} = useAppSelector(state=>state.messagesReducer);
    const dispatch = useAppDispatch();
    React.useEffect(()=>{
        dispatch(getRooms())
    },[dispatch])

    return ( 
        <>
            <List sx={{ width: '100%'}}>
                {rooms.map(r=>(
                    <RoomComponent key={r.id} setRoomId={setRoomId} room={r}/>
                ))}
            </List>
        </>
     );
}

export default MessagesUsers;