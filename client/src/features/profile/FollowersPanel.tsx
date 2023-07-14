import * as React from 'react';
import styled from 'styled-components';
import { useAppDispatch, useAppSelector } from '../../app/stores/store';
import { Link, useParams } from 'react-router-dom';
import { setProfileFollowers } from '../../app/stores/slices/profileSlice';
import { getProfileFollowers } from '../../app/stores/actions/profileActions';
import { Avatar } from '@mui/material';

const FollowersPanelDiv = styled.div`
    border-radius: 15px;
    background-color: white;
    margin-top: 1em;
    border: 0.5px solid  #D3D3D3;

    .top{
        display: flex;
        justify-content: space-between;
        border-bottom: 2px solid #01579b;
    }
    .header{
        color:#01579b;
        margin: 0.5em 1em 0 1em;
        a {
            color:inherit;
            text-decoration: none;
        }
    }

    .avatar{
        width: 50px;
        height: 50px;
        margin: 0.5em;
    }

    .avatar a {
        text-decoration: none;
    }

    .followers{
        display: flex;
        flex-wrap: wrap;
    }
`

function FollowersPanel() {

    const dispatch = useAppDispatch();
    const {followers} = useAppSelector(state => state.profileReducer)
    const {username} = useParams();
    React.useEffect(()=>{
        if (username){
            dispatch(getProfileFollowers(username))
        }
        return () =>{
            dispatch(setProfileFollowers([]))
        }
    },[dispatch, username])

    if (followers.length < 1) return null;

    return ( 
        <FollowersPanelDiv>
            <div className='top'>
                <h4 className='header'>
                    <Link to='followers'>
                        Followers
                    </Link>
                </h4>
            </div>
            <div className='followers'>
                {
                    followers.map((follower, i)=>{
                        return(
                            <div key={i} className='avatar' title={follower.firstName + ' ' + follower.lastName}>
                                <Link to={`/profile/${follower.username}`}>
                                    <Avatar sx={{width:"50px", height:'50px', fontSize:'2em'}}
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

export default FollowersPanel;