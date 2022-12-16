import { Avatar} from '@mui/material';
import * as React from 'react';
import { getProfile } from '../../app/stores/actions/profileActions';
import { useAppDispatch, useAppSelector } from '../../app/stores/store';
import News from '../news/News';


function Profile() {

    const {user} = useAppSelector(state => state.userReducer);
    const {profile} = useAppSelector(state => state.profileReducer);
    const dispatch = useAppDispatch();

    React.useEffect(()=>{
        dispatch(getProfile(user!.id))
        document.title = profile?.firstName + ' ' + profile?.lastName
    },[profile?.firstName, profile?.lastName, dispatch, user])

    return ( 
        <>
            <Avatar sx={{width:"150px", height:'150px', fontSize:'10em', marginTop:'10px', marginLeft:'5px'}}
                src={profile?.imageUrl}
                >
                {profile?.lastName.slice(0,1)}
            </Avatar>
            {
                profile?.posts 
                &&
                <News profilePosts={profile.posts}/>
            }
        </>
     );
}

export default Profile;