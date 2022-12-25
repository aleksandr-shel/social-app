import { Avatar, ListItem, ListItemAvatar } from '@mui/material';
import { formatDistanceToNow } from 'date-fns';
import * as React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { Message } from '../../app/models/Message';


const MessageDiv = styled.div`
    .date-div{
        display: inline;
        font-size: small;
        margin-left: 1em;
    }
    .sender{
        text-decoration: none;
    }
`
interface Props{
    message:Message
}
function MessageComponent({message}:Props) {
    return ( 
        <MessageDiv>
            <ListItem alignItems="flex-start" sx={{bgcolor: 'background.paper'}}>
                <ListItemAvatar>
                    <Avatar alt={message.sender.firstName} src={message.sender.imageUrl} />
                </ListItemAvatar>
                {/* <ListItemText
                    primary={message.sender.firstName}
                    secondary={
                        <React.Fragment>
                        <Typography
                            sx={{ display: 'inline' }}
                            component="span"
                            variant="body2"
                            color="text.primary"
                        >
                            {message.content}
                        </Typography>
                        </React.Fragment>
                    }
                /> */}
                <div>
                    <div>
                        <Link className='sender' to={`/profile/${message.sender.username}`}>
                            {message.sender.firstName}
                        </Link>
                        <div className='date-div'>
                            {formatDistanceToNow(new Date(message.date.endsWith('Z') ? message.date : message.date + 'Z'))} ago
                        </div>
                    </div>
                    <div>
                        {message.content}
                    </div>
                </div>
            </ListItem>
        </MessageDiv>
     );
}

export default MessageComponent;