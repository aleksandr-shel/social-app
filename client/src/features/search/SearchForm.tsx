import { FormControl, InputAdornment, TextField } from '@mui/material';
import * as React from 'react';
import SearchIcon from '@mui/icons-material/Search';
import { Form } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch } from '../../app/stores/store';
import { searchProfiles } from '../../app/stores/actions/searchActions';
import CloseIcon from '@mui/icons-material/Close';
import styled from 'styled-components';


const SearchFormDiv = styled.div`
    .mobile{
        display: none;
    }
    @media screen and (max-width: 480px) {
        .desktop{
            display: none;
        }
        .mobile{
            display: block;
        }
    }
`

function SearchForm() {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const [q, setQ] = React.useState<string>('');

    function handleSubmit(e:React.FormEvent<HTMLFormElement>){
        e.preventDefault();
        dispatch(searchProfiles(q))
        navigate('search');
    }   

    return ( 
        <SearchFormDiv>
            <Form className='desktop' onSubmit={handleSubmit}>
                <FormControl style={{width:'100%'}}>
                    <TextField
                        style={{float:'left'}}
                        size='small'
                        label="Search"
                        variant="filled"
                        value={q}
                        onChange={(e)=>setQ(e.target.value)}
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    <SearchIcon />
                                </InputAdornment>
                            ),
                            endAdornment:(
                                <InputAdornment position="end">
                                    {
                                        q !== ''
                                        &&
                                        <i style={{cursor:'pointer'}} onClick={()=>{
                                            setQ('');
                                        }}>
                                            <CloseIcon/>
                                        </i>
                                    }
                                </InputAdornment>
                            )
                        }}
                    />

                </FormControl>
            </Form>
        </SearchFormDiv>
    );
}

export default SearchForm;