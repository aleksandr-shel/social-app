import { Button, List, ListItemButton, ListItemIcon, ListItemText } from '@mui/material';
import * as React from 'react';
import MenuIcon from '@mui/icons-material/Menu';
import { Link } from 'react-router-dom';
import { User } from '../../app/models/User';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import NewspaperIcon from '@mui/icons-material/Newspaper';
import EmailIcon from '@mui/icons-material/Email';
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';
import styled from 'styled-components';

interface Props{
    user:User
}

const MenuDiv = styled.div`
    background-color: white;
    border-radius: 10px;
`

function MobileLeftSide({user}:Props) {
    const [open, setOpen] = React.useState(false)
    return ( 
        <>
            <Button onClick={()=>setOpen(!open)}>
                <MenuIcon/>
            </Button>

            {
                open 
                &&
                <MenuDiv onClick={()=>setOpen(false)}>
                    <List>
                        <ListItemButton component={Link} to={`/profile/${user?.username}`}>
                            <ListItemIcon>
                                <AccountCircleIcon fontSize='large'/>
                            </ListItemIcon>
                            <ListItemText style={{textAlign:'left'}} primary="My Profile" />
                        </ListItemButton>
                        <ListItemButton component={Link} to='/news'>
                            <ListItemIcon>
                                <NewspaperIcon fontSize='large'/>
                            </ListItemIcon>
                            <ListItemText primary="News"/>
                        </ListItemButton>
                        <ListItemButton component={Link} to='/messages'>
                            <ListItemIcon>  
                                <EmailIcon fontSize='large'/>
                            </ListItemIcon>
                            <ListItemText primary="Messages" />
                        </ListItemButton>
                        <ListItemButton component={Link} to='/friends'>
                            <ListItemIcon>  
                                <PeopleAltIcon fontSize='large'/>
                            </ListItemIcon>
                            <ListItemText primary="Friends" />
                        </ListItemButton>
                        <ListItemButton component={Link} to='/favorite'>
                            <ListItemIcon>  
                                <BookmarkBorderIcon fontSize='large'/>
                            </ListItemIcon>
                            <ListItemText primary="Favorite" />
                        </ListItemButton>
                        {/* <ListItemButton component={Link} to='/groups'>
                            <ListItemIcon>  
                                <Diversity3Icon fontSize='large'/>
                            </ListItemIcon>
                            <ListItemText primary="Groups" />
                        </ListItemButton> */}
                    </List>
                </MenuDiv>
            }
        </>
     );
}

export default MobileLeftSide;