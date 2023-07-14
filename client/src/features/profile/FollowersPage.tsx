import * as React from 'react';
import styled from 'styled-components';
import { useAppDispatch, useAppSelector } from '../../app/stores/store';
import { Link, useParams } from 'react-router-dom';
import { getProfileFollowers } from '../../app/stores/actions/profileActions';
import { setProfileFollowers } from '../../app/stores/slices/profileSlice';
import { Avatar } from '@mui/material';
import { Breadcrumb } from 'react-bootstrap';

const FollowersPanelDiv = styled.div`
    margin-bottom: 1em;
    width: 90%;
    .avatar{
        width: 200px;
        height: 200px;
        margin: 0.5em;
    }

    .avatar a {
        text-decoration: none;
    }

    .followers{
        display: flex;
        flex-wrap: wrap;
    }
    .profile-link a{
        color: #0072b1;
    }
`
function FollowersPage() {
    const dispatch = useAppDispatch();
    const {followers} = useAppSelector(state => state.profileReducer)
    const {profile} = useAppSelector(state => state.profileReducer);
    const {username} = useParams();
    React.useEffect(()=>{
        if (username){
            dispatch(getProfileFollowers(username, 50))
        }
        return () =>{
            dispatch(setProfileFollowers([]))
        }
    },[dispatch, username])

    if (followers.length < 1) return null;

    return ( 
        <FollowersPanelDiv>
            <Breadcrumb>
                <Breadcrumb.Item className='profile-link' linkAs={Link} linkProps={{ to: `/profile/${username}` }}>{profile === null ? username : profile.firstName + ' ' + profile.lastName}</Breadcrumb.Item>
                <Breadcrumb.Item active>Followers</Breadcrumb.Item>
            </Breadcrumb>
            <div className='followers'>
                {
                    followers.map((follower, i)=>{
                        return(
                            <div key={i} className='avatar' title={follower.firstName + ' ' + follower.lastName}>
                                <Link to={`/profile/${follower.username}`}>
                                    <Avatar sx={{width:"200px", height:'200px', fontSize:'10em'}}
                                        src={follower.imageUrl}
                                        >
                                        {follower.lastName.slice(0,1)}
                                    </Avatar>
                                </Link>
                            </div>
                        )
                    })
                }
            </div>
        </FollowersPanelDiv>
     );
}

export default FollowersPage;