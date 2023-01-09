import { Avatar, ListItem, ListItemAvatar } from '@mui/material';
import { formatDistanceToNow } from 'date-fns';
import * as React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import agent from '../../app/api/agent';
import { Message } from '../../app/models/Message';
import { useAppSelector } from '../../app/stores/store';


const MessageDiv = styled.div`
    margin:0;
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
    const {user} = useAppSelector(state => state.userReducer);
    async function handleDelete(){
        try{
            await agent.Messages.deleteMessage(message.id);
        }catch(error){
            console.log(error);
        }
    }

    return ( 
        <MessageDiv>
            <ListItem alignItems="flex-start" sx={{bgcolor: 'background.paper'}}>
                <ListItemAvatar>
                    <Avatar alt={message.sender.firstName} src={message.sender.imageUrl} />
                </ListItemAvatar>
                <div>
                    <div>
                        <Link className='sender' to={`/profile/${message.sender.username}`}>
                            {message.sender.firstName}
                        </Link>
                        <div className='date-div'>
                            {formatDistanceToNow(new Date(message.date.endsWith('Z') ? message.date : message.date + 'Z'))} ago
                        </div>
                    </div>
                    <div style={{whiteSpace:'pre-wrap'}}>
                        {message.content}
                    </div>
                    {
                        user?.username === message.sender.username
                        &&
                        <button onClick={handleDelete} type="button" className="btn-close position-absolute top-0 end-0" data-bs-dismiss="offcanvas" aria-label="Close"></button>
                    }
                </div>
            </ListItem>
        </MessageDiv>
     );
}

export default MessageComponent;