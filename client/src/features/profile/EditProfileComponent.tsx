import { Avatar, Button } from '@mui/material';
import {FormControl} from '@mui/material';
import TextField from '@mui/material/TextField';
import * as React from 'react';
import { Form } from 'react-bootstrap';
import styled from 'styled-components';
import { ProfileUpdateValues } from '../../app/models/User';
import { updateProfileAct } from '../../app/stores/actions/profileActions';
import { useAppDispatch, useAppSelector } from '../../app/stores/store';


const StyledDiv = styled.div`
    width:100%;
    .profile{
        display: flex;
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
    return ( 
        <StyledDiv>
            <div className='profile'>
                <Avatar sx={{width:"150px", height:'150px', fontSize:'10em', marginTop:'10px', marginLeft:'5px'}}
                    src={profile?.imageUrl}
                    >
                    {profile?.lastName.slice(0,1)}
                </Avatar>
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
            </div>
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