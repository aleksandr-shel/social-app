import { FormControl, InputAdornment, TextField } from '@mui/material';
import * as React from 'react';
import SearchIcon from '@mui/icons-material/Search';
import { Form } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch } from '../../app/stores/store';
import { searchProfiles } from '../../app/stores/actions/searchActions';

function SearchForm() {
    const [isSmall, setIsSmall] = React.useState<boolean>(true);
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const [q, setQ] = React.useState<string>('');

    function handleSubmit(e:React.FormEvent<HTMLFormElement>){
        e.preventDefault();
        dispatch(searchProfiles(q))
        navigate('search');
        setQ('')
    }   

    return ( 
        <Form onSubmit={handleSubmit}>
            <FormControl style={{width: isSmall ? '50%':'100%', transition: 'width 1s'}}>
                <TextField
                    style={{float:'left'}}
                    size='small'
                    label="Search"
                    variant="filled"
                    value={q}
                    onChange={(e)=>setQ(e.target.value)}
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
        </Form>
    );
}

export default SearchForm;