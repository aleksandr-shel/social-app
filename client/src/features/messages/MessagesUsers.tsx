import {Button, List}from '@mui/material';
import * as React from 'react';
import { getRooms } from '../../app/stores/actions/messagesActions';
import { openModal } from '../../app/stores/slices/modalSlice';
import { useAppDispatch, useAppSelector } from '../../app/stores/store';
import FollowingsSearch from './FollowingsSearch';
import RoomComponent from './RoomComponent';


function MessagesUsers() {

    const {rooms} = useAppSelector(state=>state.signalrReducer);
    const dispatch = useAppDispatch();
    React.useEffect(()=>{
        dispatch(getRooms())
    },[dispatch])

    function handleNewMessage(){
        dispatch(openModal(<FollowingsSearch/>))
    }

    return ( 
        <>
            <div>
                <Button onClick={handleNewMessage}>
                    New Message
                </Button>
            </div>
            <List sx={{ width: '100%'}}>
                {rooms.map(r=>(
                    <RoomComponent key={r.id} room={r}/>
                ))}
            </List>
        </>
     );
}

export default MessagesUsers;