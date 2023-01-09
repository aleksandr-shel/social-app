import { Avatar, Button, List, ListItem, ListItemAvatar, ListItemText, TextField, Typography } from '@mui/material';
import * as React from 'react';
import { Form } from 'react-bootstrap';
import { Profile } from '../../app/models/User';
import { getFollowings } from '../../app/stores/actions/friendsActions';
import { openModal } from '../../app/stores/slices/modalSlice';
import { setProfile } from '../../app/stores/slices/profileSlice';
import { useAppDispatch, useAppSelector } from '../../app/stores/store';
import MessageForm from './MessageForm';


function FollowingsSearch() {
    const [q, setQ] = React.useState<string>('');
    const [searchFollowings, setSearchFollowings] = React.useState<Profile[]>([]);
    const dispatch = useAppDispatch();
    const {followings} = useAppSelector(state => state.friendsReducer)
    
    React.useEffect(()=>{
        if (followings.length === 0){
            dispatch(getFollowings())
        }
    },[dispatch, followings.length])
    function handleSearch(e:React.FormEvent<HTMLFormElement>){
        e.preventDefault();
        if (q === ''){
            setSearchFollowings([])
        } else {
            setSearchFollowings(followings.filter(x => (x.firstName + ' ' + x.lastName).toLowerCase().includes(q.toLowerCase())));
        }
    }   
    function handleClickMessageToProfile(profile:Profile){
        dispatch(setProfile(profile))
        dispatch(openModal(<MessageForm/>))
    }
    return ( 
        <div>
            <h4>
                Followings
            </h4>
            <Form onSubmit={handleSearch}>
                <TextField
                        style={{width:'100%'}}
                        size='small'
                        label="Search followings"
                        variant="filled"
                        value={q}
                        onChange={(e)=>setQ(e.target.value)}
                    />
            </Form>
            <List style={{overflowY:'scroll', height:'50vh'}}>
                {
                    searchFollowings.length === 0 && q === ''
                    ?
                    followings.map(p => {
                        return(
                            <ListItem key={p.username} alignItems="flex-start">
                                <ListItemAvatar style={{marginRight:'1em'}}>
                                    <Avatar sx={{width:56, height:56}} alt={p.firstName+' '+p.lastName} src={p.imageUrl}>
                                        {p.lastName.slice(0,1)}
                                    </Avatar>
                                </ListItemAvatar>
                                <ListItemText
                                    primary={p.firstName+' '+p.lastName}
                                    secondary={
                                        <React.Fragment>
                                            <Typography
                                                sx={{ display: 'inline' }}
                                                component="span"
                                                variant="body2"
                                                color="text.primary"
                                            >
                                            </Typography>
                                            <Button onClick={()=>handleClickMessageToProfile(p)}>
                                                Message
                                            </Button>
                                        </React.Fragment>
                                    }
                                />
                            </ListItem>
                        )
                    })
                    :
                    searchFollowings.map(p => {
                        return(
                            <ListItem key={p.username} alignItems="flex-start">
                                <ListItemAvatar style={{marginRight:'1em'}}>
                                    <Avatar sx={{width:56, height:56}} alt={p.firstName+' '+p.lastName} src={p.imageUrl}>
                                        {p.lastName.slice(0,1)}
                                    </Avatar>
                                </ListItemAvatar>
                                <ListItemText
                                    primary={p.firstName+' '+p.lastName}
                                    secondary={
                                        <React.Fragment>
                                            <Typography
                                                sx={{ display: 'inline' }}
                                                component="span"
                                                variant="body2"
                                                color="text.primary"
                                            >
                                            </Typography>
                                            <Button onClick={()=>handleClickMessageToProfile(p)}>
                                                Message
                                            </Button>
                                        </React.Fragment>
                                    }
                                />
                            </ListItem>
                        )
                    })
                }
            </List>
        </div>
     );
}

export default FollowingsSearch;