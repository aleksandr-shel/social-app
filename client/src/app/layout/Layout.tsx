import { Grid } from '@mui/material';
import React from 'react';
import { Outlet } from 'react-router-dom';

const Item = ()=><div style={{height:'50px'}}></div>

function Layout() {
    return (
        <>
            <Grid container style={{border:'1px solid black'}}>
                <Grid xs={12} className='grid-item'>
                    <Item/>
                </Grid>
                <Grid xs={2} lg={4} className='grid-item'>
                    <Item/>
                </Grid>
                <Grid xs={8} lg={4} className='grid-item'>
                    <Outlet/>
                </Grid>
                <Grid xs={2} lg={4} className='grid-item'>
                    <Item/>
                </Grid>
                <Grid xs={12} className='grid-item'>
                    <Item/>
                </Grid>
            </Grid>
        </>
    );
}

export default Layout;