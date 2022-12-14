import { Avatar, Button} from '@mui/material';
import * as React from 'react';
import { useParams } from 'react-router-dom';
import { getProfile } from '../../app/stores/actions/profileActions';
import { useAppDispatch, useAppSelector } from '../../app/stores/store';
import {Grid} from '@mui/material';
import { toggleFriend } from '../../app/stores/actions/friendsActions';
import { openModal } from '../../app/stores/slices/modalSlice';
import MessageForm from '../messages/MessageForm';
import EditProfileComponent from './EditProfileComponent';
import ImagesPanel from './ImagesPanel';
import NewsList from '../news/NewsList';

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
                            <div>
                                <Avatar sx={{width:"150px", height:'150px', fontSize:'10em', marginTop:'10px', marginLeft:'5px'}}
                                    src={profile?.imageUrl}
                                    >
                                    {profile.lastName.slice(0,1)}
                                </Avatar>
                            </div>
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
                                <div style={{display:'flex', color:'gray',fontWeight:'bold'}}>
                                    <div style={{marginRight:'1em'}}>
                                        <span style={{color:'#01579b'}}>
                                            {profile.followers}
                                        </span>
                                        {' '}
                                        followers
                                    </div>
                                    {
                                        '|'
                                    }
                                    <div style={{marginLeft:'1em'}}>
                                        <span style={{color:'#01579b'}}>
                                            {profile.followings}
                                        </span>
                                        {' '}
                                        followings
                                    </div>
                                </div>
                            </div>
                        </>
                    }
                </Grid>
                <Grid item xs={7}>
                    <ImagesPanel owner={user?.username === profile.username} images={profile.images}/>
                    {
                        profile?.posts 
                        &&
                        <NewsList profilePosts={profile.posts} username={username}/>
                    }
                </Grid>
            </Grid>
        </>
     );
}

export default Profile;