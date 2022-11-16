import * as React from 'react';
import styled from 'styled-components';

const Image = styled.img`
    width: 200px;
`
console.log('hello')
function Profile() {
    return ( 
        <>
            <Image src='User.jpg'/>
        </>
     );
}

export default Profile;