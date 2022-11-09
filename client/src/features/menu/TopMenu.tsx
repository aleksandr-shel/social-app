import React from 'react';
import styled from 'styled-components';
import { TextField, Grid, ListItemIcon, ListItemText, ListItem, FormControl, InputAdornment} from '@mui/material';
import Diversity3Icon from '@mui/icons-material/Diversity3';
import SearchIcon from '@mui/icons-material/Search';
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
                <Grid xs={0.25} lg={1.5}>
                </Grid>
                <Grid xs={2.75} lg={1.5}>
                    <ListItem>
                        <ListItemIcon>  
                            <Diversity3Icon fontSize='large' color='primary'/>
                        </ListItemIcon>
                        <ListItemText primary="Messages" />
                    </ListItem>
                </Grid>
                <Grid xs={5}>
                    <FormControl>
                        <TextField 
                            style={{margin:'1em auto'}} 
                            size='small' 
                            label="Search" 
                            variant="filled"
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <SearchIcon/>
                                    </InputAdornment>
                                ),
                              }}
                            />

                    </FormControl>
                </Grid>
                <Grid xs={4}>

                </Grid>
            </Grid>
        </Wrapper>
    );
}

export default TopMenu;