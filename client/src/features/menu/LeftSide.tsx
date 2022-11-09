import * as React from 'react';
import {Grid, List, ListItemButton, ListItemIcon, ListItemText} from '@mui/material';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import NewspaperIcon from '@mui/icons-material/Newspaper';
import EmailIcon from '@mui/icons-material/Email';
import {Link} from 'react-router-dom';


function LeftSide() {
    return ( 
        <Grid container>
            <Grid xs={1} lg={6}>

            </Grid>
            <Grid xs={11} lg={6}>
                <List>
                    <ListItemButton component={Link} to="/profile">
                        <ListItemIcon>
                            <AccountCircleIcon fontSize='large'/>
                        </ListItemIcon>
                        <ListItemText style={{textAlign:'left'}} primary="Profile" />
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
                </List>
            </Grid>
        </Grid>
    );
}

export default LeftSide;