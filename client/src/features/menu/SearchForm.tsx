import { FormControl, InputAdornment, TextField } from '@mui/material';
import * as React from 'react';
import SearchIcon from '@mui/icons-material/Search';

function SearchForm() {
    const [isSmall, setIsSmall] = React.useState<boolean>(true);

    return ( 
        <FormControl style={{width: isSmall ? '50%':'100%', transition: 'width 1s'}}>
            <TextField
                style={{float:'left'}}
                size='small'
                label="Search"
                variant="filled"
                onFocus={()=>{setIsSmall(false)}}
                onBlur={()=>{setIsSmall(true)}}
                InputProps={{
                    startAdornment: (
                        <InputAdornment position="start">
                            <SearchIcon />
                        </InputAdornment>
                    ),
                }}
            />

        </FormControl>
    );
}

export default SearchForm;