import React from 'react';
import styled from 'styled-components';
import {Grid, ListItemIcon, ListItemText, ListItemButton} from '@mui/material';
import Diversity2Icon from '@mui/icons-material/Diversity2';
import UserMenu from './UserMenu';
import { Link } from 'react-router-dom';
import SearchForm from '../search/SearchForm';

const Wrapper = styled.div`
    background-color: white;
    @media screen and (max-width: 992px) {
        background-color: #EAEAEA;
    }
`

function TopMenu() {

    return (
        <Wrapper>
            <Grid container>
                <Grid item xs={0.25} lg={1.5}>
                </Grid>
                <Grid item xs={2.75} lg={1.5} style={{ display: 'flex', alignItems: 'center' }}>
                    <ListItemButton component={Link} to='news' disableRipple={true}>
                        <ListItemIcon>
                            <Diversity2Icon fontSize='large' color='primary' />
                        </ListItemIcon>
                        <ListItemText primary='NetVerse' style={{color:'#01579b', fontWeight:'bolder'}}/>
                    </ListItemButton>
                </Grid>
                <Grid item xs={3}>
                    <SearchForm/>
                </Grid>
                <Grid item xs={6} style={{ display: 'flex', alignItems: 'center', justifyContent:'center'}}>
                    <UserMenu/>
                </Grid>
            </Grid>
        </Wrapper>
    );
}

export default TopMenu;