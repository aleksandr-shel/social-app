import { Avatar, Box } from '@mui/material';
import * as React from 'react';
import styled from 'styled-components';
import { useAppSelector } from '../../app/stores/store';

const Image = styled.img`
    width: 200px;
`

function Profile() {

    const {user} = useAppSelector(state => state.userReducer);

    React.useEffect(()=>{
        document.title = user?.firstName + ' ' + user?.lastName;
    },[user?.firstName, user?.lastName])

    return ( 
        <>
            {/* <Image src='User.jpg'/> */}
            <Avatar sx={{width:"250px", height:'250px', fontSize:'10em', marginTop:'10px', marginLeft:'5px'}}>
                {user?.lastName.slice(0,1)}
            </Avatar>
            <Box>
                
            </Box>
        </>
     );
}

export default Profile;