import * as React from 'react';
import {Grid, List, ListItemButton, ListItemIcon, ListItemText} from '@mui/material';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import NewspaperIcon from '@mui/icons-material/Newspaper';
import EmailIcon from '@mui/icons-material/Email';
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import {Link} from 'react-router-dom';
import { useAppSelector } from '../../app/stores/store';
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';
import Diversity3Icon from '@mui/icons-material/Diversity3';
import styled from 'styled-components';
import MobileLeftSide from './MobileLeftSide';

const LeftSideDiv = styled.div`
    .mobile{
        display: none;
    }
    @media screen and (max-width: 600px) {
        .desktop{
            display: none;
        }
        .mobile{
            display: block;
            z-index: 1002 !important;
            position: fixed;
        }
    }
`

function LeftSide() {

    const {user} = useAppSelector(state => state.userReducer)

    
    return (
        <>
            <LeftSideDiv>
                {
                user === null ?
                <>
                </>
                :
                <>
                    <div className='desktop'>
                        <Grid container>
                            <Grid item xs={0} lg={6}>

                            </Grid>
                            <Grid item xs={12} lg={6}>
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
                            </Grid>
                        
                        </Grid>
                    </div>
                    <div className='mobile'>
                        <MobileLeftSide user={user}/>
                    </div>
                </>
            }
            </LeftSideDiv>
        </>
    );
}

export default LeftSide;