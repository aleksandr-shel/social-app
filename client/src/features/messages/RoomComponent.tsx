import { Avatar, ListItem, ListItemAvatar, ListItemText, Typography } from '@mui/material';
import * as React from 'react';
import { Link} from 'react-router-dom';
import { Author } from '../../app/models/Post';
import { Room } from '../../app/models/Room';
import { useAppSelector } from '../../app/stores/store';
import styled from 'styled-components';

interface Props{
    room:Room,
    setRoomId: (roomId:string)=>void;
}

const ListItemDiv = styled.div`
    cursor: pointer;
`


function RoomComponent({room, setRoomId}:Props) {
    const {user} = useAppSelector(state => state.userReducer)
    const [partner,] = React.useState<Author>(room.users.filter(x=>x.username !== user?.username)[0]);
    

    return ( 
        <ListItemDiv
            onClick={()=>setRoomId(room.id)}
            >
            <ListItem alignItems="flex-start" 
                    sx={{bgcolor:'background.paper', border: '0.5px solid  #D3D3D3'}}
                >
                <ListItemAvatar style={{marginRight:'1em'}}>
                    <Avatar component={Link} to={`/profile/${partner.username}`} alt={partner.firstName + ' ' +partner.lastName} src={partner.imageUrl}>
                        {partner.lastName.slice(0,1)}
                    </Avatar>
                </ListItemAvatar>
                <ListItemText
                    primary={partner.firstName + ' ' +partner.lastName}
                    secondary={
                        <React.Fragment>
                        <Typography
                            sx={{ display: 'inline'}}
                            variant="body2"
                            color="text.primary"
                        >
                            here message
                        </Typography>
                        </React.Fragment>
                    }
                />
            </ListItem>
        </ListItemDiv>
     );
}

export default RoomComponent;