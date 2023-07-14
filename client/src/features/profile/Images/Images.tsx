import * as React from 'react';
import { useAppDispatch, useAppSelector } from '../../../app/stores/store';
import { Link, useParams } from 'react-router-dom';
import { Breadcrumb } from 'react-bootstrap';
import { getProfileImages } from '../../../app/stores/actions/profileActions';
import styled from 'styled-components';
import { setProfileImages } from '../../../app/stores/slices/profileSlice';
import { Button } from '@mui/material';
import AddImageModal from './AddImageModal';
import { openModal } from '../../../app/stores/slices/modalSlice';

const ImagesDiv = styled.div`
    margin-bottom: 1em;
    width: 90%;
    .images-container{
        display: flex;
        flex-wrap: wrap;
    }
    .image{
        flex: 0 0 33%;
        display: flex;
        align-items: center;
        justify-content: center;
    }
    .image img{
        max-width: 100%;
        max-height: 100%;
        margin: auto;
    }

    .profile-link a{
        color: #0072b1;
    }
`

function Images() {
    const {profile, images} = useAppSelector(state => state.profileReducer);
    const {user} = useAppSelector(state => state.userReducer);
    const {username} = useParams();
    const dispatch = useAppDispatch();

    function handleAddImageClick(){
        dispatch(openModal(<AddImageModal/>))
    }

    React.useEffect(()=>{
        if (username){
            dispatch(getProfileImages(username));
        }

        return()=>{
            dispatch(setProfileImages([]))
        }
    }, [dispatch, username])
    return ( 
        <ImagesDiv>
            <Breadcrumb>
                <Breadcrumb.Item className='profile-link' linkAs={Link} linkProps={{ to: `/profile/${username}` }}>{profile === null ? username : profile.firstName + ' ' + profile.lastName}</Breadcrumb.Item>
                <Breadcrumb.Item active>Images</Breadcrumb.Item>
            </Breadcrumb>
            {
                username === user?.username
                &&
                <Button onClick={handleAddImageClick}>
                    Add Image
                </Button>
            }
            <div className='images-container'>
                {
                    images.length !== 0
                    &&
                    images.map((image,index)=>{
                        return(
                            <div key={image.key} className='image'>
                                <img src={image.url} alt={image.key}/>
                            </div>
                        )
                    })
                }
            </div>
        </ImagesDiv>
     );
}

export default Images;