import { Grid } from '@mui/material';
import * as React from 'react';
import NewsList from './NewsList';


function News() {

    return ( 
        <Grid container>
            <Grid style={{marginBottom:'1em'}} item sm={12} md={7}>
                <NewsList/>
            </Grid>
        </Grid>
     );
}

export default News;