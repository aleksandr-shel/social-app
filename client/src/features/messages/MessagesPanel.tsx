import * as React from 'react';
import { Grid} from '@mui/material';
import MessagesUsers from './MessagesUsers';
import Messages from './Messages';

function MessagesPanel() {

    React.useEffect(()=>{
        document.title = 'Messages';
        
    },[])
    
    const [roomId, setRoomId] = React.useState<string>();

    return ( 
        <Grid container>
            <Grid item xs={3}>
                <MessagesUsers setRoomId={setRoomId}/>
            </Grid>
            <Grid item xs={6}>
                <Messages roomId={roomId}/>
            </Grid>
        </Grid>
     );
}

export default MessagesPanel;