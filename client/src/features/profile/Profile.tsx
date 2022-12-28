import { Avatar, Button} from '@mui/material';
import * as React from 'react';
import { useParams } from 'react-router-dom';
import { getProfile } from '../../app/stores/actions/profileActions';
import { useAppDispatch, useAppSelector } from '../../app/stores/store';
import News from '../news/News';
import {Grid} from '@mui/material';
import { toggleFriend } from '../../app/stores/actions/friendsActions';
import { openModal } from '../../app/stores/slices/modalSlice';
import MessageForm from '../messages/MessageForm';
import EditProfileComponent from './EditProfileComponent';

function Profile() {

    const {username} = useParams();
    const [editMode, setEditMode] = React.useState(false);
    const {user} = useAppSelector(state => state.userReducer);
    const {profile} = useAppSelector(state => state.profileReducer);
    const dispatch = useAppDispatch();

    React.useEffect(()=>{
        if (username){
            dispatch(getProfile(username))
            document.title = profile?.firstName + ' ' + profile?.lastName
        }
    },[profile?.firstName, profile?.lastName, dispatch, username])


    function handleToggleFriend(){
        dispatch(toggleFriend(profile!))
    }

    if (!profile) return null

    return ( 
        <>
            <Grid container>
                <Grid item xs={7} style={{display:'flex'}}>
                    {
                        editMode ?
                        <EditProfileComponent setEditMode={setEditMode}/>
                        :
                        <>
                            <Avatar sx={{width:"150px", height:'150px', fontSize:'10em', marginTop:'10px', marginLeft:'5px'}}
                                src={profile?.imageUrl}
                                >
                                {profile.lastName.slice(0,1)}
                            </Avatar>
                            <div style={{display:'flex', flexDirection:'column', justifyContent:'space-between', marginLeft: '1em'}}>
                                <span style={{color:'#01579b', fontSize:'large', fontWeight:'bold'}}>
                                    {profile.firstName} 
                                    {' '}
                                    {profile.lastName} 
                                </span>
                                <span style={{whiteSpace:'pre-wrap'}}>
                                    {profile.about}
                                </span>
                                {
                                    user?.username !== profile.username
                                    ?
                                    <div style={{ marginTop:'1em'}}>
                                        <Button onClick={()=>dispatch(openModal(<MessageForm/>))}>
                                            Message
                                        </Button>
                                        <Button onClick={handleToggleFriend}>
                                            {
                                                profile.following ?
                                                'unfollow'
                                                :
                                                'follow'
                                            }
                                        </Button>
                                    </div>
                                    :
                                    <div>
                                        <Button onClick={()=>setEditMode(true)}>
                                            Edit
                                        </Button>
                                    </div>
                                }
                            </div>
                        </>
                    }
                </Grid>
                <Grid item  xs={3}>
                </Grid>
            </Grid>
            {
                profile?.posts 
                &&
                <News profilePosts={profile.posts} username={username}/>
            }
        </>
     );
}

export default Profile;