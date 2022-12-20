import * as React from 'react';
import { useAppSelector } from '../../app/stores/store';
import ProfileList from '../../app/common/ProfileList';
import { Grid } from '@mui/material';

function SearchResults() {

    const {results} = useAppSelector(state => state.searchReducer)

    return ( 
        <Grid container>
            <Grid item xs={6}>
                <ProfileList profiles={results}/>
            </Grid>
        </Grid>
     );
}

export default SearchResults;