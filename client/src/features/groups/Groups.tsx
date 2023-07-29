import * as React from 'react';
import { useAppDispatch, useAppSelector } from '../../app/stores/store';
import { loadGroups, searchGroups } from '../../app/stores/actions/groupsActions';
import GroupItem from './GroupItem';
import styled from 'styled-components';
import { Button, FormControl, InputAdornment, TextField } from '@mui/material';
import { Form } from 'react-bootstrap';
import CloseIcon from '@mui/icons-material/Close';
import { setSearchResults } from '../../app/stores/slices/groupsSlice';
import { useNavigate } from 'react-router-dom';

const GroupsDiv = styled.div`
    width:100%;
    overflow: hidden;
    display: flex;
    .search-div{
        margin: 0.5em;
    }
`

function Groups() {

    const {groups, searchResults} = useAppSelector(state => state.groupReducer)
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const [q, setQ] = React.useState('');

    React.useEffect(()=>{
        document.title='Groups';
        if (groups.length <= 0){
            dispatch(loadGroups());
        }
    },[dispatch, groups.length])


    React.useEffect(()=>{
        if (q === ''){
            dispatch(setSearchResults([]))
        }
    },[q, dispatch])

    function handleSearch(e:React.FormEvent<HTMLFormElement>){
        e.preventDefault();
        dispatch(searchGroups(q));
    }

    return (
        <GroupsDiv>
            <div style={{flex:'50%'}}>
                <div className='search-div'>
                    <Form onSubmit={handleSearch}>
                        <FormControl style={{width:'100%'}}>
                            <TextField
                                style={{float:'left'}}
                                size='small'
                                label="Search groups"
                                variant="filled"
                                value={q}
                                onChange={(e)=>setQ(e.target.value)}
                                InputProps={{
                                    endAdornment: (
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
                                    ),
                                  }}
                            />

                        </FormControl>
                        <Button type='submit'>
                            Search
                        </Button>
                    </Form>
                </div>
                {
                    (
                        searchResults.length === 0
                        || q === '')
                    ?
                    groups.map((group, index)=>{
                        return(
                            <React.Fragment key={group.id}>
                                <GroupItem group={group}/>
                            </React.Fragment>
                        )
                    })
                    :
                    searchResults.map((group,index)=>{
                        return(
                            <React.Fragment key={group.id}>
                                <GroupItem group={group}/>
                            </React.Fragment>
                        )
                    })
                }
            </div>
            <div style={{flex:'25%'}}>
                <Button style={{margin:'0.5em'}} onClick={()=>navigate('/create-group')}>
                    Create Group
                </Button>
            </div>
        </GroupsDiv>
     );
}

export default Groups;