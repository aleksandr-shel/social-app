import React from 'react';
import styled from 'styled-components';
import {Grid, ListItemIcon, ListItemText, ListItemButton} from '@mui/material';
import Diversity2Icon from '@mui/icons-material/Diversity2';
import UserMenu from './UserMenu';
import SearchForm from './SearchForm';
import { Link } from 'react-router-dom';

const Wrapper = styled.div`
    background-color: white;
    @media screen and (max-width: 992px) {
        background-color: lightpink;
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
                        <ListItemText primary="COOPCHIK" />
                    </ListItemButton>
                </Grid>
                <Grid item xs={5}>
                    <SearchForm/>
                </Grid>
                <Grid item xs={1}>
                </Grid>
                <Grid item xs={3} style={{ display: 'flex', alignItems: 'center' }}>
                    <UserMenu/>
                </Grid>
            </Grid>
        </Wrapper>
    );
}

export default TopMenu;