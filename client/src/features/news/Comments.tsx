import * as React from 'react';
import CloseIcon from '@mui/icons-material/Close';
import styled from 'styled-components';

interface Props{
    show:boolean,
    setShow:(v:boolean)=>void
}

const CommentsDiv = styled.div`
    /* position: absolute;
    left:100%;
    top:0; */
    /* border-radius: 15px; */
    background-color: white;
    overflow: hidden;
    border-top: 0.5px solid #D3D3D3;
    margin-top: 0.5em;
    .btn-cross{
        width:fit-content;
    }
    .btn-cross:hover{
        cursor: pointer;
    }

`

function Comments({show, setShow}:Props) {
    
    // if (!show) return null

    return ( 
        <CommentsDiv>
            <div className='btn-cross' onClick={()=>setShow(false)}>
                <CloseIcon/>
            </div>
            Comments
        </CommentsDiv>
     );
}

export default Comments;