import { Avatar, List, ListItem, ListItemAvatar, ListItemText, Typography } from '@mui/material';
import * as React from 'react';
import { Link } from 'react-router-dom';
import { Profile } from '../models/User';

interface Props{
    profiles: Profile[]
}

function ProfileList({profiles}:Props) {
    if (profiles.length === 0) return null
    return ( 
        <List>
            {
                profiles.map(p => {
                    return(
                        <ListItem component={Link} to={`/profile/${p.username}`} alignItems="flex-start">
                            <ListItemAvatar style={{marginRight:'1em'}}>
                                <Avatar sx={{width:56, height:56}} alt={p.firstName+' '+p.lastName} src={p.imageUrl}>
                                    {p.lastName.slice(0,1)}
                                </Avatar>
                            </ListItemAvatar>
                            <ListItemText
                                primary={p.firstName+' '+p.lastName}
                                secondary={
                                    <React.Fragment>
                                        <Typography
                                            sx={{ display: 'inline' }}
                                            component="span"
                                            variant="body2"
                                            color="text.primary"
                                        >
                                        </Typography>
                                        {p.about}
                                    </React.Fragment>
                                }
                            />
                        </ListItem>
                    )
                })
            }
        </List>
     );
}

export default ProfileList;