import { Grid} from '@mui/material';
import React from 'react';
import { Outlet } from 'react-router-dom';
import LeftSide from '../../features/menu/LeftSide';
import TopMenu from '../../features/menu/TopMenu';

const Item = ()=><div style={{height:'50px'}}></div>

function Layout() {
    return (
        <>
            <Grid container className='main-grid'>
                <Grid xs={12} className='grid-item'>
                    <TopMenu/>
                </Grid>
                <Grid xs={3} >
                    <LeftSide/>
                </Grid>
                <Grid xs={5} className='main'>
                    <Outlet/>
                </Grid>
                <Grid xs={4} className='grid-item'>
                    <Item/>
                </Grid>
            </Grid>
        </>
    );
}

export default Layout;