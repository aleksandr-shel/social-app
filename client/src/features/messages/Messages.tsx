import { List} from '@mui/material';
import * as React from 'react';
import LoadingComponent from '../../app/layout/LoadingComponent';
import { createHubConnection, getMessages } from '../../app/stores/actions/messagesActions';
import { stopHubConnection } from '../../app/stores/slices/messagesSlice';
import { useAppDispatch, useAppSelector } from '../../app/stores/store';
import MessageComponent from './MessageComponent';
import PostMessageComponent from './PostMessageComponent';

function Messages() {
    const dispatch = useAppDispatch();
    const {messages, loadingMessages, selectedRoom} = useAppSelector(state => state.messagesReducer);
    React.useEffect(()=>{
        if (selectedRoom){
            dispatch(getMessages(selectedRoom.id))
            dispatch(createHubConnection(selectedRoom.id))
        }
        return ()=>{
            dispatch(stopHubConnection())
        }
    },[dispatch, selectedRoom])
    if (selectedRoom === undefined) return <div style={{textAlign:'center'}}>Select chat</div>

    if (loadingMessages) return <LoadingComponent/>

    if (messages.length === 0) return <>No messages</>
    return ( 
        <div style={{height:'90vh'}}>
            <List sx={{ width: '100%', overflow:'auto', height:'90%', display:'flex', flexDirection:'column-reverse', padding:0, margin:'0.5em'}}>
                {messages.map(mes => <MessageComponent key={mes.id} message={mes}/>)}
            </List>
            <PostMessageComponent/>
        </div>
     );
}

export default Messages;