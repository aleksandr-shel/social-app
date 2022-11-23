import { Grid} from '@mui/material';
import React from 'react';
import { Outlet } from 'react-router-dom';
import LeftSide from '../../features/menu/LeftSide';
import TopMenu from '../../features/menu/TopMenu';

function Layout() {

    return (
        <>
            <Grid container className='main-grid'>
                <Grid item xs={12}>
                    <TopMenu/>
                </Grid>
                <Grid item xs={3}>
                    <LeftSide/>
                </Grid>
                <Grid item xs={9}>
                    <Outlet/>
                </Grid>
            </Grid>
        </>
    );
}

export default Layout;