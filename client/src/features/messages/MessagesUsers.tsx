import {List}from '@mui/material';
import * as React from 'react';
import { getRooms } from '../../app/stores/actions/messagesActions';
import { useAppDispatch, useAppSelector } from '../../app/stores/store';
import RoomComponent from './RoomComponent';


function MessagesUsers() {

    const {rooms} = useAppSelector(state=>state.messagesReducer);
    const dispatch = useAppDispatch();
    React.useEffect(()=>{
        dispatch(getRooms())
    },[dispatch])

    return ( 
        <>
            <List sx={{ width: '100%'}}>
                {rooms.map(r=>(
                    <RoomComponent key={r.id} room={r}/>
                ))}
            </List>
        </>
     );
}

export default MessagesUsers;