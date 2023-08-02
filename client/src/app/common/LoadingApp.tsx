import * as React from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import styled from 'styled-components';

const LoadingDiv = styled.div`
    position: absolute;
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
    width: 100vw;
`

function LoadingApp() {

    return ( 
        <LoadingDiv>
            <CircularProgress/>
        </LoadingDiv>
     );
}

export default LoadingApp;