import * as React from 'react';
import { useAppSelector } from '../../app/stores/store';


function MessagesUsers() {

    const {profiles} = useAppSelector(state=>state.messagesReducer);


    return ( 
        <>
            {profiles.map(x=>(
                <div>
                    {x.firstName}
                </div>
            ))}
        </>
     );
}

export default MessagesUsers;