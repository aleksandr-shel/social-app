import { Avatar, Button, Grid } from '@mui/material';
import {FormControl} from '@mui/material';
import TextField from '@mui/material/TextField';
import * as React from 'react';
import { Form } from 'react-bootstrap';
import styled from 'styled-components';
import ImageUploadWidget from '../../app/common/ImageUploadWidget';
import { ProfileUpdateValues } from '../../app/models/User';
import { updateProfileAct } from '../../app/stores/actions/profileActions';
import { openModal } from '../../app/stores/slices/modalSlice';
import { useAppDispatch, useAppSelector } from '../../app/stores/store';
import EditProfileImageModal from './EditProfileImageModal';


const StyledDiv = styled.div`
    width:100%;
    .profile{
        display: flex;
    }
    .avatar-container{
        position: relative;
    }
    .profile-img{
        position: relative;
    }
    .img-profile-edit-hover{
        z-index: 1;
        position: absolute;
        width: 100%;
        height:100%;
        opacity: 0.5;
        display: flex;
        align-items: center;
        justify-content: center;
        margin: auto;
        cursor: pointer;
        font-size: medium;
    }
    .buttons{
        display: flex;
        justify-content: end;
    }
`

interface Props{
    setEditMode: (p:boolean)=>void
}

function EditProfileComponent({setEditMode}:Props) {

    const {profile} = useAppSelector(state => state.profileReducer);
    const [firstName, setFirstName] = React.useState(profile?.firstName);
    const [lastName, setLastName] = React.useState(profile?.lastName);
    const [about, setAbout] = React.useState(profile?.about);
    const [avatarHover, setAvatarHover] = React.useState(false);
    const dispatch = useAppDispatch();

    function handleEditClick(){
        if (firstName && lastName && about){
            let updateProfile:ProfileUpdateValues={
                firstName,
                lastName,
                about
            }
            dispatch(updateProfileAct(updateProfile))
            setEditMode(false);
        }
    }

    function handleProfileImageModal(){
        dispatch(openModal(<EditProfileImageModal/>))
    }

    return ( 
        <StyledDiv>
            <Grid container className='profile'>
                <Grid className='avatar-container' item xs={3}
                    onMouseOver={()=>setAvatarHover(true)} 
                    onMouseLeave={()=>setAvatarHover(false)} >
                    <Avatar className='profile-img' 
                        sx={{width:"150px", height:'150px', fontSize:'10em', margin:'auto'}}
                        src={avatarHover ? '' : profile?.imageUrl}
                        >
                        {
                            avatarHover ?
                            <div className='img-profile-edit-hover' onClick={handleProfileImageModal}>
                                EDIT IMAGE
                            </div>
                            :
                            <>{profile?.lastName.slice(0,1)}</>
                        }
                    </Avatar>
                </Grid>
                <Grid item xs={9} style={{width:'100%'}}>
                    <Form style={{width:'100%', marginLeft:'1em'}}>
                        <FormControl style={{width:'100%'}}>
                            <TextField
                                variant="filled" 
                                label='First Name'
                                value={firstName}
                                onChange={(e)=>setFirstName(e.target.value)}
                            />
                            <TextField
                                variant="filled" 
                                label='Last Name'
                                value={lastName}
                                onChange={(e)=>setLastName(e.target.value)}
                            />
                            <TextField
                                style={{width:'100%'}}
                                label="About" 
                                variant="filled" 
                                multiline={true}
                                value={about}
                                onChange={(e)=>setAbout(e.target.value)}
                            />
                        </FormControl>
                        
                    </Form>
                </Grid>
            </Grid>
            <div className='buttons'>
                <Button onClick={handleEditClick}>
                    Edit
                </Button>
                <Button color='secondary' onClick={()=>setEditMode(false)}>
                    Close
                </Button>
            </div>
        </StyledDiv>
     );
}

export default EditProfileComponent;