import * as React from 'react';
import styled from 'styled-components';

const Image = styled.img`
    width: 200px;
`

function Profile() {
    return ( 
        <>
            <Image src='User.jpg'/>
        </>
     );
}

export default Profile;