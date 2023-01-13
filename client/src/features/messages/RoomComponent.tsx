import { Avatar, ListItem, ListItemAvatar, ListItemText, Typography } from '@mui/material';
import * as React from 'react';
import { Link} from 'react-router-dom';
import { Author } from '../../app/models/Post';
import { Room } from '../../app/models/Room';
import { useAppDispatch, useAppSelector } from '../../app/stores/store';
import styled from 'styled-components';
import { selectRoom, setPartner } from '../../app/stores/slices/messagesSlice';
import { formatDistanceToNow } from 'date-fns';

interface Props{
    room:Room
}

const ListItemDiv = styled.div`
    cursor: pointer;
`


function RoomComponent({room}:Props) {
    const {user} = useAppSelector(state => state.userReducer)
    const [partner,] = React.useState<Author>(room.users.filter(x=>x.username !== user?.username)[0]);
    const dispatch = useAppDispatch();

    function clickOnRoom(){
        dispatch(selectRoom(room));
        dispatch(setPartner(partner))
    }

    return ( 
        <ListItemDiv
            onClick={clickOnRoom}
            >
            <ListItem alignItems="flex-start" 
                    sx={{bgcolor:'background.paper', border: '0.5px solid  #D3D3D3'}}
                >
                <ListItemAvatar style={{marginRight:'1em'}}>
                    <Avatar style={{textDecoration:'none'}} component={Link} to={`/profile/${partner.username}`} alt={partner.firstName + ' ' +partner.lastName} src={partner.imageUrl}>
                        {partner.lastName.slice(0,1)}
                    </Avatar>
                </ListItemAvatar>
                <ListItemText
                    primary={partner.firstName + ' ' +partner.lastName}
                    secondary={
                        <React.Fragment>
                        <Typography
                            component='div'
                            sx={{ fontSize:'small'}}
                            variant="body2"
                            color="text.primary"
                        >
                            {formatDistanceToNow(new Date(room.lastUpdate.endsWith('Z') ? room.lastUpdate : room.lastUpdate + 'Z'))} ago
                        </Typography>
                            {room.lastMessage.length > 10 ? room.lastMessage.slice(0, 10) + '...' : room.lastMessage}
                        </React.Fragment>
                    }
                />
            </ListItem>
        </ListItemDiv>
     );
}

export default RoomComponent;