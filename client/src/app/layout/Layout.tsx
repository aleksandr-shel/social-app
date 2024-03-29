import { Grid} from '@mui/material';
import React from 'react';
import { Outlet } from 'react-router-dom';
import LeftSide from '../../features/menu/LeftSide';
import TopMenu from '../../features/menu/TopMenu';
import ScrollToTop from '../common/ScrollToTop';

function Layout() {

    return (
        <>
            <ScrollToTop/>
            <Grid container className='main-grid'>
                <Grid item xs={12}>
                    <TopMenu/>
                </Grid>
                <Grid item xs={2} sm={3}>
                    <LeftSide/>
                </Grid>
                <Grid item xs={10} sm={9}>
                    <Outlet/>
                </Grid>
            </Grid>
        </>
    );
}

export default Layout;