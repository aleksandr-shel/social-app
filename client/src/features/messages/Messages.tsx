import { List} from '@mui/material';
import * as React from 'react';
import LoadingComponent from '../../app/layout/LoadingComponent';
import { createHubConnection, getMessages } from '../../app/stores/actions/messagesActions';
import { stopHubConnection } from '../../app/stores/slices/messagesSlice';
import { useAppDispatch, useAppSelector } from '../../app/stores/store';
import MessageComponent from './MessageComponent';
import PostMessageComponent from './PostMessageComponent';
interface Props{
    roomId?:string | null
}

function Messages({roomId}:Props) {
    const dispatch = useAppDispatch();
    const {messages, loadingMessages} = useAppSelector(state => state.messagesReducer);
    // React.useEffect(()=>{
    //     if (roomId){
    //         dispatch(getMessages(roomId))
    //     }

    // },[dispatch, roomId])
    React.useEffect(()=>{
        if (roomId){
            dispatch(getMessages(roomId))
            dispatch(createHubConnection(roomId))
        }
        return ()=>{
            dispatch(stopHubConnection())
        }
    },[dispatch, roomId])
    if (roomId === undefined) return <div style={{textAlign:'center'}}>Select chat</div>

    if (loadingMessages) return <LoadingComponent/>

    if (messages.length === 0) return <>No messages</>
    return ( 
        <div style={{height:'80%'}}>
            <List sx={{ width: '100%'}}>
                {messages.map(mes => <MessageComponent key={mes.id} message={mes}/>)}
            </List>
            <PostMessageComponent/>
        </div>
     );
}

export default Messages;