import { Avatar, Button} from '@mui/material';
import * as React from 'react';
import { useParams } from 'react-router-dom';
import { getProfile } from '../../app/stores/actions/profileActions';
import { useAppDispatch, useAppSelector } from '../../app/stores/store';
import {Grid} from '@mui/material';
import { toggleFriend } from '../../app/stores/actions/friendsActions';
import MessageForm from '../messages/MessageForm';
import EditProfileComponent from './EditProfileComponent';
import ImagesPanel from './ImagesPanel';
import ProfileNewsList from './ProfileNewsList';
import ImageCarousel from '../images/ImageCarousel';
import { Image } from '../../app/models/Image';
import { setCurrentImage, setImages } from '../../app/stores/slices/imagesSlices';
import { openModal } from '../../app/stores/slices/imageModalSlice';
import { openModal as openGeneralModal } from '../../app/stores/slices/modalSlice';
import styled from 'styled-components';
import FollowersPanel from './FollowersPanel';
import LoadingComponent from '../../app/layout/LoadingComponent';

const CustomBtn = styled.button`
    cursor: pointer;
    background-color: #0072b1;
    border:0;
    border-radius: 20px;
    color:white;
    padding: 0.5em 0.5em;
    margin: 0.5em;
    font-weight: bold;
    position: relative;
    min-width: 180px;
    white-space: nowrap;

    &:hover{
        box-shadow: 0 0 10px #0072b1;
    }

    &:active{
        box-shadow: 0 0 30px #0072b1;
    }
`

const ProfileDiv = styled.div`
    margin-top:0.5em;
    .cover-section img{
        max-width: 100%;
        max-height: 100%;
        display: block;
        border-radius: 10px;
    }

    .about-section{
        display: flex;
    }

    .avatar-div{
        position: relative;
        top: -100px;
    }

    .avatar-div div{
        border-radius: 50%;
        border: 5px solid white;
        background-color: #EAEAEA;
    }

    .info{
        display:flex;
        flex-direction: column;
        justify-content: space-between;
        margin-left: 1em;
    }
`

function Profile() {

    const {username} = useParams();
    const [editMode, setEditMode] = React.useState(false);
    const {user} = useAppSelector(state => state.userReducer);
    const {profile, loading} = useAppSelector(state => state.profileReducer);
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


    function handleClickImage(img:Image){
        dispatch(openModal(<ImageCarousel/>))
        dispatch(setCurrentImage(img))
        dispatch(setImages(profile!.images))
    }
    if (!profile) return null

    if (loading) return (
        <Grid container>
            <Grid item xs={12} lg={10} style={{height:'90vh'}}>
                <LoadingComponent/>
            </Grid>
        </Grid>
    )
    return ( 
        <>
            <Grid container>
                <Grid item xs={12} lg={10} style={{display:'flex'}}>
                    {
                        editMode ?
                        <EditProfileComponent setEditMode={setEditMode}/>
                        :
                        <ProfileDiv>
                            <div className='cover-section'>
                                <img src='/cover.jpg' alt='cover'/>
                            </div>
                            <div className='about-section'>
                                <div className='avatar-div' onClick={()=>handleClickImage(profile.images.filter(x => x.isMain)[0])}>
                                    <Avatar sx={{width:"200px", height:'200px', fontSize:'10em'}}
                                        src={profile?.imageUrl}
                                        >
                                        {profile.lastName.slice(0,1)}
                                    </Avatar>
                                </div>
                                <div className='info'>
                                    <span style={{color:'#01579b', fontSize:'large', fontWeight:'bold'}}>
                                        {profile.firstName} 
                                        {' '}
                                        {profile.lastName} 
                                    </span>
                                    <span style={{whiteSpace:'pre-wrap'}}>
                                        {profile.about}
                                    </span>
                                    {
                                        user &&(
                                        user?.username !== profile.username
                                        ?
                                        <div style={{ marginTop:'1em'}}>
                                            <CustomBtn onClick={()=>dispatch(openGeneralModal(<MessageForm/>))}>
                                                Message
                                            </CustomBtn>
                                            <CustomBtn onClick={handleToggleFriend}>
                                                {
                                                    profile.following ?
                                                    'unfollow'
                                                    :
                                                    'follow'
                                                }
                                            </CustomBtn>
                                        </div>
                                        :
                                        <div>
                                            <Button onClick={()=>setEditMode(true)}>
                                                Edit
                                            </Button>
                                        </div>)
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
                            </div>
                        </ProfileDiv>
                    }
                </Grid>
                <Grid item xs={8} lg={7}>
                    <ImagesPanel owner={user !== null && user?.username === profile.username} images={profile.images}/>
                    {
                        profile?.posts 
                        &&
                        <ProfileNewsList profilePosts={profile.posts} username={username}/>
                    }
                </Grid>
                <Grid item xs={4} lg={3}>
                    <FollowersPanel/>
                </Grid>
            </Grid>
        </>
     );
}

export default Profile;