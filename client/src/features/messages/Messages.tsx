import * as React from 'react';
import { createHubConnection } from '../../app/stores/actions/messagesActions';
import { stopHubConnection } from '../../app/stores/slices/messagesSlice';
import { useAppDispatch } from '../../app/stores/store';

interface Props{
    roomId?:string | null
}

function Messages({roomId}:Props) {

    const dispatch = useAppDispatch();
    React.useEffect(()=>{
        dispatch(createHubConnection())
        return ()=>{
            dispatch(stopHubConnection())
        }
    },[dispatch])
    return ( 
        <>
            Messages
        </>
     );
}

export default Messages;