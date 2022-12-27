import * as React from 'react';
import { Grid} from '@mui/material';
import MessagesUsers from './MessagesUsers';
import Messages from './Messages';

function MessagesPanel() {

    React.useEffect(()=>{
        document.title = 'Messages';
        
    },[])
    

    return ( 
        <Grid container>
            <Grid item xs={3}>
                <MessagesUsers/>
            </Grid>
            <Grid item xs={6}>
                <Messages/>
            </Grid>
        </Grid>
     );
}

export default MessagesPanel;